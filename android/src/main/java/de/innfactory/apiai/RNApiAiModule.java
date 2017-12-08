package de.innfactory.apiai;

import android.os.AsyncTask;
import android.util.Log;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.facebook.react.bridge.Promise;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import ai.api.AIListener;
import ai.api.AIServiceException;
import ai.api.android.AIConfiguration;
import ai.api.android.AIDataService;
import ai.api.android.AIService;
import ai.api.android.SessionIdStorage;
import ai.api.model.AIError;
import ai.api.model.AIRequest;
import ai.api.model.AIResponse;
import ai.api.model.Result;
import ai.api.model.AIContext;
import ai.api.model.Entity;
import ai.api.model.EntityEntry;
import ai.api.RequestExtras;


/**
 * Created by Anton Spöck on 2017-07-21
 **/
public class RNApiAiModule extends ReactContextBaseJavaModule implements AIListener {

    private static final String TAG = "ApiAi";

    private static final String LANG_CHINESE_CHINA = "LANG_CHINESE_CHINA";
    private static final String LANG_CHINESE_HONGKONG = "LANG_CHINESE_HONGKONG";
    private static final String LANG_CHINESE_TAIWAN = "LANG_CHINESE_TAIWAN";
    private static final String LANG_DUTCH = "LANG_DUTCH";
    private static final String LANG_ENGLISH = "LANG_ENGLISH";
    private static final String LANG_ENGLISH_GB = "LANG_ENGLISH_GB";
    private static final String LANG_ENGLISH_US = "LANG_ENGLISH_US";
    private static final String LANG_FRENCH = "LANG_FRENCH";
    private static final String LANG_GERMAN = "LANG_GERMAN";
    private static final String LANG_ITALIAN = "LANG_ITALIAN";
    private static final String LANG_JAPANESE = "LANG_JAPANESE";
    private static final String LANG_KOREAN = "LANG_KOREAN";
    private static final String LANG_PORTUGUESE = "LANG_PORTUGUESE";
    private static final String LANG_PORTUGUESE_BRAZIL = "LANG_PORTUGUESE_BRAZIL";
    private static final String LANG_RUSSIAN = "LANG_RUSSIAN";
    private static final String LANG_SPANISH = "LANG_SPANISH";
    private static final String LANG_UKRAINIAN = "LANG_UKRAINIAN";


    private AIService aiService;
    private AIConfiguration config = new AIConfiguration("",
            AIConfiguration.SupportedLanguages.DEFAULT,
            AIConfiguration.RecognitionEngine.System);
    private AIDataService aiDataService;
    private List<AIContext> contexts;
    private List<AIContext> permantentContexts;
    private List<Entity> entities;
    private Callback onResultCallback;
    private Callback onErrorCallback;
    private Callback onListeningStartedCallback;
    private Callback onListeningCanceledCallback;
    private Callback onListeningFinishedCallback;
    private Callback onAudioLevelCallback;

    private String accessToken;
    private String languageTag;


    public RNApiAiModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }


    @Override
    public String getName() {
        return "ApiAi";
    }

    @ReactMethod
    public void setConfiguration(String clientAccessToken, String languageTag) {
        this.accessToken = clientAccessToken;
        this.languageTag = languageTag;
        config = new AIConfiguration(clientAccessToken, AIConfiguration.SupportedLanguages.fromLanguageTag(languageTag), AIConfiguration.RecognitionEngine.System);
    }

    @ReactMethod
    public void getLanguage(Promise promise) {
        promise.resolve(languageTag);
    }

    @ReactMethod
    public void setContextsAsJson(String contextsAsJson) {
        Gson gson = new Gson();
        contexts = gson.fromJson(contextsAsJson, new TypeToken<List<AIContext>>() {
        }.getType());
    }

    @ReactMethod
    public void setPermanentContextsAsJson(String contextsAsJson) {
        Gson gson = new Gson();
        permantentContexts = gson.fromJson(contextsAsJson, new TypeToken<List<AIContext>>() {
        }.getType());
    }


    @ReactMethod
    public void setEntitiesAsJson(String userEntitiesAsJson) throws AIServiceException {
        Gson gson = new Gson();
        entities = gson.fromJson(userEntitiesAsJson, new TypeToken<List<Entity>>() {
        }.getType());
    }


    @ReactMethod
    public void startListeningNative(Callback onResult, Callback onError) {//, Callback onListeningStarted, Callback onListeningCanceled,  Callback onListeningFinished,  Callback onAudioLevel) {

        onResultCallback = onResult;
        onErrorCallback = onError;

        getCurrentActivity().runOnUiThread(new Runnable() {

            public void run() {

                aiService = AIService.getService(getReactApplicationContext(), config);
                aiService.setListener(RNApiAiModule.this);

                // set contexts
                if (contexts != null || permantentContexts != null || entities != null) {
                    RequestExtras requestExtras = new RequestExtras(mergeContexts(contexts, permantentContexts), entities);
                    aiService.startListening(requestExtras);
                    contexts = null;
                    entities = null;
                } else {

                    // start listening without context
                    aiService.startListening();
                }


            }
        });
    }


    @ReactMethod
    public void stopListening() {
        getCurrentActivity().runOnUiThread(new Runnable() {

            public void run() {

                if (aiService != null) {
                    aiService.stopListening();
                }
            }
        });
    }


    @ReactMethod
    public void cancel() {
        getCurrentActivity().runOnUiThread(new Runnable() {

            public void run() {

                if (aiService != null) {
                    aiService.cancel();
                }
            }
        });
    }


    @Override
    public void onResult(AIResponse response) {

        if (onResultCallback != null) {
            Gson gson = new Gson();
            try {
                onResultCallback.invoke(gson.toJson(response));
            } catch (Exception e) {
                Log.e(TAG, e.getMessage(), e);
            }
        }

    }

    @Override
    public void onError(final AIError error) {

        if (onErrorCallback != null) {
            Gson gson = new Gson();

            try {
                onErrorCallback.invoke(gson.toJson(error));
            } catch (Exception e) {
                Log.e(TAG, e.getMessage(), e);
            }
        }
    }

    @ReactMethod
    public void onListeningStarted(Callback callback) {
        onListeningStartedCallback = callback;
    }

    @Override
    public void onListeningStarted() {
        if (onListeningStartedCallback != null) {
            try {
                onListeningStartedCallback.invoke();
            } catch (Exception e) {
                Log.e(TAG, e.getMessage(), e);
            }
        }
    }

    @ReactMethod
    public void onListeningCanceled(Callback callback) {
        onListeningCanceledCallback = callback;
    }

    @Override
    public void onListeningCanceled() {
        if (onListeningCanceledCallback != null) {
            try {
                onListeningCanceledCallback.invoke();
            } catch (Exception e) {
                Log.e(TAG, e.getMessage(), e);
            }
        }
    }

    @ReactMethod
    public void onListeningFinished(Callback callback) {
        onListeningFinishedCallback = callback;
    }

    @Override
    public void onListeningFinished() {
        if (onListeningFinishedCallback != null) {
            try {
                onListeningFinishedCallback.invoke();
            } catch (Exception e) {
                Log.e(TAG, e.getMessage(), e);
            }
        }
    }


    @ReactMethod
    public void onAudioLevel(Callback callback) {
        onAudioLevelCallback = callback;
    }

    @Override
    public void onAudioLevel(float level) {
        if (onAudioLevelCallback != null) {
            try {
                onAudioLevelCallback.invoke(level);
            } catch (Exception e) {
                Log.e(TAG, e.getMessage(), e);
            }
        }

    }


    @ReactMethod
    public void requestQueryNative(String query, Callback onResult, Callback onError) {

        onResultCallback = onResult;
        onErrorCallback = onError;

        if (aiDataService == null) {
            aiDataService = new AIDataService(getReactApplicationContext(), config);
        }

        final AIRequest aiRequest = new AIRequest();
        aiRequest.setQuery(query);


        new AsyncTask<AIRequest, Void, AIResponse>() {
            @Override
            protected AIResponse doInBackground(AIRequest... requests) {
                final AIRequest request = requests[0];
                try {

                    AIResponse response = null;

                    // set contexts
                    if (contexts != null || permantentContexts != null || entities != null) {
                        RequestExtras requestExtras = new RequestExtras(mergeContexts(contexts, permantentContexts), entities);
                        response = aiDataService.request(aiRequest, requestExtras);
                        contexts = null;
                        entities = null;
                    } else {

                        // start request without context
                        response = aiDataService.request(aiRequest);
                    }

                    return response;
                } catch (AIServiceException e) {
                    Gson gson = new Gson();
                    try {
                        onErrorCallback.invoke(gson.toJson(e));
                    } catch (Exception e1) {
                        Log.e(TAG, e.getMessage(), e);
                    }
                }
                return null;
            }

            @Override
            protected void onPostExecute(AIResponse aiResponse) {
                if (aiResponse != null) {
                    onResult(aiResponse);
                }
            }
        }.execute(aiRequest);
    }

    @ReactMethod
    public void getAccessToken(Promise promise) {
        promise.resolve(accessToken);
    }

    @ReactMethod
    public void getSessionId(Promise promise) {
        promise.resolve(SessionIdStorage.getSessionId(getReactApplicationContext()));
    }

    private  List<AIContext> mergeContexts(List<AIContext> contexts1,  List<AIContext> contexts2) {
        if (contexts1 == null) {
            return contexts2;
        } else if (contexts2 == null) {
            return contexts1;
        } else {
            contexts1.addAll(contexts2);
            return contexts1;
        }
    }

    @Override
    public Map<String, Object> getConstants() {
        final Map<String, Object> constants = new HashMap<>();
        constants.put(LANG_CHINESE_CHINA, "zh-CN");
        constants.put(LANG_CHINESE_HONGKONG, "zh-HK");
        constants.put(LANG_CHINESE_TAIWAN, "zh-TW");
        constants.put(LANG_DUTCH, "nl");
        constants.put(LANG_ENGLISH, "en");
        constants.put(LANG_ENGLISH_GB, "en-GB");
        constants.put(LANG_ENGLISH_US, "en-US");
        constants.put(LANG_FRENCH, "fr");
        constants.put(LANG_GERMAN, "de");
        constants.put(LANG_ITALIAN, "it");
        constants.put(LANG_JAPANESE, "ja");
        constants.put(LANG_KOREAN, "ko");
        constants.put(LANG_PORTUGUESE, "pt");
        constants.put(LANG_PORTUGUESE_BRAZIL, "pt-BR");
        constants.put(LANG_RUSSIAN, "ru");
        constants.put(LANG_SPANISH, "es");
        constants.put(LANG_UKRAINIAN, "uk");
        return constants;
    }


}