from functools import wraps
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.core.exceptions import PermissionDenied, BadRequest

from base64 import b64decode

def login_required():
    def decorator(view_func):
        @wraps(view_func)
        def _wrapped_view(request, *args, **kwargs):
            if 'Authorization' in request.headers:
                auth_method, value = request.headers['Authorization'].split()
                if auth_method == 'Basic':
                    username, password = b64decode(value).decode('latin1').split(':')
                    user = authenticate(request, username=username, password=password)
                    if user is not None:
                        request.user = get_object_or_404(User, username=username)
                    else:
                        raise PermissionDenied(f'Username or password invalid.')
                else:
                    raise BadRequest(f'Authentication method not recognized {auth_method}.')
            else:
                raise PermissionDenied('Must be logged in.')
            return view_func(request, *args, **kwargs)
        return _wrapped_view
    return decorator