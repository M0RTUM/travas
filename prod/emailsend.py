import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

SMTP_SERVER = 'smtp.yandex.ru'
SMTP_PORT = 587
USERNAME = ''
PASSWORD = ''

def send_email(to_email, subject, body):
    try:
        msg = MIMEMultipart()
        msg['From'] = USERNAME
        msg['To'] = to_email
        msg['Subject'] = subject
        msg.attach(MIMEText(body, 'plain', 'utf-8'))

        server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
        server.starttls()
        server.login(USERNAME, PASSWORD)
        server.sendmail(USERNAME, to_email, msg.as_string())
        server.quit()
        print(f'Письмо успешно отправлено на {to_email}')
    except Exception as e:
        print(f'Ошибка при отправке письма на {to_email}: {e}')
