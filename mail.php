<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

require_once 'vendor/autoload.php';

$cart = $_POST['cart'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$comment = $_POST['comment'];

$err = [];
if (empty($cart)) $err['cart'] = 'Выберите продукт';
if (empty($name)) $err['name'] = 'Введите имя';
if (empty($phone)) $err['phone'] = 'Введите телефон';
if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) $err['email'] = 'Введите корректный email';

if (!empty($err)) {
    http_response_code(400);
    echo json_encode([
        'error' => $err,
        'code' => 'validate_error',
        'status' => 400
    ]);
    exit();
}

$mail = new PHPMailer(true);

try {
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->isSMTP();
    $mail->Host = 'mail.talentspot.ru';
    $mail->SMTPAuth = true;
    $mail->Username = 'noreply@talentspot.ru';
    $mail->Password = 'xT4cM3eF1y';
    $mail->Port = 25;

    $mail->setFrom($email, $nane);
    $mail->addAddress("zamorozkino.stv@gmail.com");
    $mail->addReplyTo($email);
    $mail->CharSet = "utf-8";
    $mail->isHTML(true);

    $mail->Subject = 'Новый заказ';
    $mail->Body = '
        <h2>Новый заказ с zamorozkino.ru</h2>
        <p><strong>Имя:</strong> ' . htmlspecialchars($name) . '</p>
        <p><strong>Телефон:</strong> ' . htmlspecialchars($phone) . '</p>
        <p><strong>Почта:</strong> ' . htmlspecialchars($email) . '</p>
        <p><strong>Комментарий:</strong> ' . htmlspecialchars($comment) . '</p>
    ';
    $mail->AltBody = '';

    $mail->send();

    $response = [
        'status' => 200,
        'message' => 'Message has been sent'
    ];
}  catch (Exception $e) {
    http_response_code(500);
    $response = [
        'status' => 500,
        'error' => 'Message could not be sent.',
        'debug' => $mail->ErrorInfo
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
exit();
?>
