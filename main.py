from kivy.app import App
from kivy.uix.boxlayout import BoxLayout
from android.runnable import run_on_ui_thread
from jnius import autoclass

WebView = autoclass('android.webkit.WebView')
WebViewClient = autoclass('android.webkit.WebViewClient')
PythonActivity = autoclass('org.kivy.android.PythonActivity')

class MyApp(App):

    @run_on_ui_thread
    def load_web(self, url):
        activity = PythonActivity.mActivity
        layout = activity.getWindow().getDecorView().findViewById(0x1020002)

        self.web = WebView(activity)
        self.web.getSettings().setJavaScriptEnabled(True)
        self.web.setWebViewClient(WebViewClient())
        self.web.loadUrl(url)

        layout.addView(self.web)

    def build(self):
        box = BoxLayout()
        self.load_web("https://maryamhamed27277-hash.github.io/Roma-knzy-stor/")
        return box

MyApp().run()
