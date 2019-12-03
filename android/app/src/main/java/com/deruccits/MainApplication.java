package com.deruccits;

import android.app.Application;

import com.facebook.react.ReactApplication;
<<<<<<< HEAD
=======
import com.reactnativecommunity.webview.RNCWebViewPackage;
>>>>>>> newtoken
import com.reactnativecommunity.slider.ReactSliderPackage;
import ca.jaysoo.extradimensions.ExtraDimensionsPackage;
import com.imagepicker.ImagePickerPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
import com.horcrux.svg.SvgPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import cn.qiuxiang.react.amap3d.AMap3DPackage;
import com.henninghall.date_picker.DatePickerPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
<<<<<<< HEAD
=======
            new RNCWebViewPackage(),
>>>>>>> newtoken
            new ReactSliderPackage(),
          new ExtraDimensionsPackage(),
          new ImagePickerPackage(),
          new ReactVideoPackage(),
          new AsyncStoragePackage(),
          new SvgPackage(),
          new LinearGradientPackage(),
          new AMap3DPackage(),
          new DatePickerPackage(),
          new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }


}
