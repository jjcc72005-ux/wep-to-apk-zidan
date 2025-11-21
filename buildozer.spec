[app]
title = Roma
package.name = roma
package.domain = org.roma
source.dir = .
source.include_exts = py,png,jpg,kv,txt
version = 1.0
requirements = python3,kivy,android,pyjnius
orientation = portrait
fullscreen = 0
android.permissions = INTERNET
android.api = 33
android.minapi = 21
android.ndk = 25b
android.gradle_dependencies = "com.android.support:appcompat-v7:28.0.0"

[buildozer]
warn_on_root = 0
