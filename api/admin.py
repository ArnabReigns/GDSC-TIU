from django.contrib import admin
from .models import User,Session
from django.contrib.auth.models import Group
# Register your models here.

class UserAdminManager(admin.ModelAdmin):

    list_display = ['name','email','is_active','is_superuser']
    # fields = ['name','email','password']
    fieldsets = (
        (None, {
            'fields': ('name', 'email', 'last_login','password','verify_otp')
        }),
        ('Advanced options', {
            'classes': ('collapse',),
            'fields': ('user_permissions', 'groups'),
        }),
        ('Account Details',{
            'classes':'wide',
            'fields':(('department','year'),('batch','studentId'))
        }),
        ('Permissions',{
            'classes':'wide',
            'fields':(('is_active','is_superuser','is_staff'))
        })
    )

class SessionAdmin(admin.ModelAdmin):

    list_display = ['title','facilator','date','time']

admin.site.register(User,UserAdminManager)
admin.site.register(Session,SessionAdmin)
admin.site.unregister(Group)