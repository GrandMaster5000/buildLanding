<?php
// $fio = $_POST['name'];
// $tel = $_POST['tel'];
// $fio = htmlspecialchars($fio);
// $tel = htmlspecialchars($tel);
// $fio = urldecode($fio);
// $tel = urldecode($tel);
// $fio = trim($fio);
// $tel = trim($tel);
// mail("info@korobskix.ru", "Сообщение с сайта", "ФИО:" . $fio . ". Tel: " . $tel, "From: info@korobskix.ru \r\n"."Content-Type: text/html; charset=\"utf-8\"\r\n");

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->isHTML(true);

//От кого отправить
$mail->setFrom('info@korobskix.ru', 'Сообщение с сайта');
//Кому отправить

$mail->addAddress('info@korobskix.ru');
//Тема письма

$mail->Subject = 'Письмо с сайта';

$body = '<h1>Данные кондидата</h1>';

if(trim(!empty($_POST['name']))) {
    $body.='<p><strong>Имя:</strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['tel']))) {
    $body.='<p><strong>Телефон:</strong> '.$_POST['tel'].'</p>';
}

$mail->Body = $body;

if(!$mail->send()) {
    $messsage = 'ошибка';
} else {
    $messsage = 'Успешно';
}

$response = ['message' => $messsage];

header('Content-type: application/json');
echo json_encode($response);






