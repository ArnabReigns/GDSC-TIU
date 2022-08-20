from datetime import datetime
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import UserSerializer,SessionSerializer
from .models import Session,User
from .email import verificationEmail
from rest_framework import status
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken


# Create your views here.


@api_view(['POST'])
def RegisterUser(req):
    if req.method == 'POST':
        try:
            serializer = UserSerializer(data=req.data)
            if serializer.is_valid():
                otp = verificationEmail([serializer.validated_data['email']])
                serializer.validated_data['verify_otp'] = otp
                serializer.save()
                return Response({
                    'status':'200',
                    'message':'registration Successfull',
                    'name':serializer.validated_data['name'],
                    'email':serializer.validated_data['email'],
                })
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        except Exception as E:
            return Response({
                print(E)
            })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def UpcomingSessions(req):

    sessions = Session.objects.all().filter(date__gt=datetime.today()).order_by('date')
    serializer = SessionSerializer(sessions,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def todaySessions(req):

    sessions = Session.objects.all().filter(date=datetime.today()).order_by('date')
    serializer = SessionSerializer(sessions,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def activation(req,otp):
    
    if req.method == 'GET':
        
        user = User.objects.get(verify_otp=otp)
        user.is_active = True
        user.save()
        serializer = UserSerializer(user)
        return Response(serializer.data)


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

@api_view(['GET','POST'])
def login(req):

    if req.method == 'GET':
        return Response("Login Endpoint")
    else:
        email = req.data['email']    
        password = req.data['password']
        try: 
            user = User.objects.get(email=email)
        except:
            return Response('user not found',status=status.HTTP_400_BAD_REQUEST)

        if check_password(password,user.password) :
            return Response(get_tokens_for_user(user))
        else:
            return Response('Wrong Credentials',status=status.HTTP_400_BAD_REQUEST)

        

