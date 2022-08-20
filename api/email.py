import random
from django.core.mail import send_mail,EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from django.utils.html import strip_tags

def send_otp_via_email(email):

    subject = 'Registration Verification Email for GDSC TIU'
    otp = random.randint(1000,9999)
    message = f'Your OTP is {otp}'
    from_email = settings.EMAIL_HOST
    send_mail(subject,message,from_email , email)

    return otp

def verificationEmail(email):

    subject = 'Registration Verification Email for GDSC TIU'
    otp = random.randint(1000,9999)
    message = f'Click this link  to active your account : http://localhost:8000/api/accounts/activation/{otp}'
    from_email = settings.EMAIL_HOST
    send_mail(subject,message,from_email , email)

    return otp


