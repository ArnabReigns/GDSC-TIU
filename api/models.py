from django.db import models
from django.contrib.auth.models import AbstractBaseUser,PermissionsMixin,BaseUserManager

import uuid
# Create your models here.


class UserManager(BaseUserManager):

    def create_user(self,name,email,password,**extra_fields):

        email = self.normalize_email(email)
        user = self.model(name=name,email=email,**extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self,name,email,password,**extra_fields):

        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        extra_fields.setdefault('is_active',True)


        return self.create_user(name,email,password,**extra_fields)



class User(AbstractBaseUser,PermissionsMixin):
    name = models.CharField(max_length=255)
    email= models.EmailField(max_length=255,unique=True,blank=False,null=False)
    department = models.CharField(max_length=255,blank=True)
    batch = models.CharField(max_length=255,blank=True)
    year = models.CharField(max_length=255,choices=[('1','First Year'),('2','Second Year'),('3','Third Year'),('4','Fourth Year')],blank=True)
    studentId = models.IntegerField(default=0,blank=True,null=True,unique=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False,help_text='Is the user account active on your website')
    verify_otp = models.CharField(max_length=10,blank=True,null=True)
    

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    def __str__(self) -> email:
        return self.name

    
class Session(models.Model):

    title = models.CharField(max_length=255)
    facilator = models.ForeignKey(User,on_delete=models.SET_NULL,null=True)
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField()
    uid = models.UUIDField(default=uuid.uuid4,editable=False)


    def __str__(self):
        return self.title
