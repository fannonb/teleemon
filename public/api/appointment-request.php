<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed.']);
    exit;
}

function str_clean($value, int $max = 500): string {
    if (!is_string($value)) {
        return '';
    }
    $value = trim(str_replace(["\r", "\n", "\0"], '', $value));
    if ($value === '') {
        return '';
    }
    return mb_substr($value, 0, $max);
}

function json_error(string $message, int $status = 500): void {
    http_response_code($status);
    echo json_encode(['ok' => false, 'error' => $message]);
    exit;
}

function load_env_file(string $path): void {
    if (!is_file($path) || !is_readable($path)) {
        return;
    }
    $lines = file($path, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
    if (!is_array($lines)) {
        return;
    }
    foreach ($lines as $line) {
        $line = trim($line);
        if ($line === '' || strpos($line, '#') === 0) {
            continue;
        }
        $eq = strpos($line, '=');
        if ($eq === false || $eq < 1) {
            continue;
        }
        $key = trim(substr($line, 0, $eq));
        $val = substr($line, $eq + 1);
        putenv($key . '=' . $val);
        $_ENV[$key] = $val;
        $_SERVER[$key] = $val;
    }
}

// Optional env file support for shared hosting deploys.
load_env_file(dirname(__DIR__, 4) . '/.teleemon.env');
load_env_file(dirname(__DIR__, 2) . '/.teleemon.env');

$raw = file_get_contents('php://input');
$data = json_decode($raw ?: '', true);
if (!is_array($data)) {
    json_error('Invalid JSON payload.', 400);
}

$fullName = str_clean($data['fullName'] ?? '', 200);
$dob = str_clean($data['dob'] ?? '', 32);
$phone = str_clean($data['phone'] ?? '', 40);
$email = str_clean($data['email'] ?? '', 200);
$contactMethod = str_clean($data['contactMethod'] ?? '', 40);
$voicemail = str_clean($data['voicemail'] ?? '', 10);
$insurance = str_clean($data['insurance'] ?? '', 200);
$primaryPolicyholder = str_clean($data['primaryPolicyholder'] ?? '', 10);
$policyholderInfo = str_clean($data['policyholderInfo'] ?? '', 300);
$privatePayInfo = str_clean($data['privatePayInfo'] ?? '', 10);
$preferredTimes = str_clean($data['preferredTimes'] ?? '', 1000);
$appointmentState = str_clean($data['appointmentState'] ?? '', 100);
$otherService = str_clean($data['otherService'] ?? '', 300);
$helpDescription = str_clean($data['helpDescription'] ?? '', 2000);
$submittedAt = str_clean($data['submittedAt'] ?? '', 64);
if ($submittedAt === '') {
    $submittedAt = gmdate('c');
}

$services = [];
if (isset($data['services']) && is_array($data['services'])) {
    foreach ($data['services'] as $s) {
        if (is_string($s)) {
            $services[] = mb_substr(trim($s), 0, 80);
        }
    }
}

$missing = [];
foreach ([
    'fullName' => $fullName,
    'dob' => $dob,
    'phone' => $phone,
    'email' => $email,
    'contactMethod' => $contactMethod,
    'voicemail' => $voicemail,
    'insurance' => $insurance,
    'primaryPolicyholder' => $primaryPolicyholder,
    'appointmentState' => $appointmentState,
] as $key => $value) {
    if ($value === '') {
        $missing[] = $key;
    }
}
if (count($services) === 0) {
    $missing[] = 'services';
}
if ($primaryPolicyholder === 'no' && $policyholderInfo === '') {
    $missing[] = 'policyholderInfo';
}
if (in_array('other', $services, true) && $otherService === '') {
    $missing[] = 'otherService';
}
if (empty($data['consentContact']) || empty($data['consentAccuracy'])) {
    $missing[] = 'consent';
}
if (!empty($missing)) {
    json_error('Missing or invalid fields: ' . implode(', ', $missing), 422);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_error('Please provide a valid email address.', 422);
}

$labels = [
    'telephone' => 'Telephone call',
    'text' => 'Text message',
    'email' => 'Email',
    'yes' => 'Yes',
    'no' => 'No',
    'initial-evaluation' => 'Initial psychiatric evaluation',
    'medication-management' => 'Medication management',
    'therapy' => 'Therapy',
    'adhd' => 'ADHD evaluation or treatment',
    'anxiety-depression' => 'Anxiety or depression treatment',
    'other' => 'Other',
];

$serviceLines = [];
foreach ($services as $service) {
    $label = $labels[$service] ?? $service;
    if ($service === 'other' && $otherService !== '') {
        $label .= ' (' . $otherService . ')';
    }
    $serviceLines[] = $label;
}

$rows = [
    ['Full name', $fullName],
    ['Date of birth', $dob],
    ['Callback number', $phone],
    ['Email', $email],
    ['Preferred contact', $labels[$contactMethod] ?? $contactMethod],
    ['Voicemail OK', $labels[$voicemail] ?? $voicemail],
    ['Services requested', implode(', ', $serviceLines)],
    ['How we may help', $helpDescription !== '' ? $helpDescription : '—'],
    ['Insurance company', $insurance],
    ['Primary policyholder', $labels[$primaryPolicyholder] ?? $primaryPolicyholder],
    ['Policyholder details', $policyholderInfo !== '' ? $policyholderInfo : '—'],
    ['Private-pay info requested', $privatePayInfo !== '' ? ($labels[$privatePayInfo] ?? $privatePayInfo) : '—'],
    ['Preferred days/times', $preferredTimes !== '' ? $preferredTimes : '—'],
    ['State during appointment', $appointmentState],
    ['Submitted at', $submittedAt],
];

$to = getenv('MAIL_TO') ?: 'info@teleemon.com';
$from = getenv('MAIL_FROM') ?: 'info@teleemon.com';

$subject = 'Appointment request: ' . $fullName;

$plain = "New appointment request from teleemon.com\n" . str_repeat('-', 42) . "\n";
foreach ($rows as $row) {
    $plain .= $row[0] . ': ' . $row[1] . "\n";
}

$boundary = md5((string) microtime(true));
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'From: Teleemon Website <' . $from . '>';
$headers[] = 'Reply-To: ' . $fullName . ' <' . $email . '>';
$headers[] = 'Content-Type: multipart/alternative; boundary="' . $boundary . '"';

$htmlRows = '';
foreach ($rows as $row) {
    $k = htmlspecialchars($row[0], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    $v = nl2br(htmlspecialchars((string) $row[1], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'));
    $htmlRows .= '<tr><td style="border:1px solid #d8cdf8;background:#f6f2ff;font-weight:bold;vertical-align:top;">' . $k .
        '</td><td style="border:1px solid #d8cdf8;vertical-align:top;">' . $v . '</td></tr>';
}
$html = '<h2 style="color:#3b288f;font-family:Arial,sans-serif;">New appointment request</h2>' .
    '<table cellpadding="8" cellspacing="0" style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;color:#1e144d;">' .
    $htmlRows . '</table>' .
    '<p style="font-family:Arial,sans-serif;font-size:12px;color:#6652a8;margin-top:16px;">Submitted via the website appointment request form. This does not establish a provider-patient relationship.</p>';

$body = "--$boundary\r\n";
$body .= "Content-Type: text/plain; charset=UTF-8\r\n\r\n";
$body .= $plain . "\r\n";
$body .= "--$boundary\r\n";
$body .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
$body .= $html . "\r\n";
$body .= "--$boundary--";

$ok = @mail($to, $subject, $body, implode("\r\n", $headers));
if (!$ok) {
    json_error('Unable to send your request right now. Please call the office or email info@teleemon.com.', 500);
}

echo json_encode(['ok' => true, 'message' => 'Appointment request sent.']);
