package de.innfactory.apiai;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import ai.api.AIListener;
import ai.api.android.AIConfiguration;
import ai.api.android.AIService;
import ai.api.model.AIError;
import ai.api.model.AIResponse;
import ai.api.model.Result;
import com.google.gson.JsonElement;

import android.widget.Toast;

import java.util.Map;

/**
 * Created by Anton Spöck on 2017-07-21
 **/
public class RNApiAiModule extends ReactContextBaseJavaModule implements AIListener {


    private AIService aiService;
    final AIConfiguration config = new AIConfiguration("57b6ce865e6e4b138a74a88cfd8bc526",
            AIConfiguration.SupportedLanguages.German,
            AIConfiguration.RecognitionEngine.System);

    public RNApiAiModule(ReactApplicationContext reactContext) {
        super(reactContext);


    }


    @Override
    public String getName() {
        return "ApiAi";
    }


    @ReactMethod
    public void startListening() {
        getCurrentActivity().runOnUiThread(new Runnable() {

            public void run() {

                Toast.makeText(getReactApplicationContext(), "startListening", Toast.LENGTH_SHORT).show();
                aiService = AIService.getService(getReactApplicationContext(), config);
                aiService.setListener(RNApiAiModule.this);
                aiService.startListening();

            }
        });
    }

    @Override
    public void onResult(AIResponse response) {
        final Result result = response.getResult();

        // Get parameters
        String parameterString = "";
        if (result.getParameters() != null && !result.getParameters().isEmpty()) {
            for (final Map.Entry<String, JsonElement> entry : result.getParameters().entrySet()) {
                parameterString += "(" + entry.getKey() + ", " + entry.getValue() + ") ";
            }
        }

        final String parameterStringFinal = parameterString;

        getCurrentActivity().runOnUiThread(new Runnable() {

            public void run() {
                Toast.makeText(getReactApplicationContext(), "Query:" + result.getResolvedQuery() +
                        "\nAction: " + result.getAction() +
                        "\nParameters: " + parameterStringFinal, Toast.LENGTH_LONG).show();
            }
        });


    }

    @Override
    public void onError(AIError error) {
        Toast.makeText(getReactApplicationContext(), error.toString(), Toast.LENGTH_LONG).show();
    }

    @Override
    public void onAudioLevel(float level) {

    }

    @Override
    public void onListeningStarted() {
    }

    @Override
    public void onListeningCanceled() {
    }

    @Override
    public void onListeningFinished() {
    }
}