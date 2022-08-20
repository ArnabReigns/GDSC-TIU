from datetime import datetime
from rest_framework import serializers
from .models import Session, User
from django.contrib.auth.hashers import make_password

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        validated_data['last_login'] = datetime.today()
        return super(UserSerializer, self).create(validated_data)

class SessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ['title','date','time','description','facilator','id']
        
