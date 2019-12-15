from django import forms
from django.contrib.auth.forms import UserCreationForm

from accounts.models import User


class SignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('email', 'password1', 'password2')
        labels = {
            'email': '이메일'
        }


class LoginForm(forms.Form):
    email = forms.EmailField(
        label='이메일',
    )
    password = forms.CharField(
        label='비밀번호',
        widget=forms.PasswordInput()
    )
