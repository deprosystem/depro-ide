package servlets;

import com.squareup.okhttp.Callback;
import com.squareup.okhttp.OkHttpClient;
import com.squareup.okhttp.Request;
import com.squareup.okhttp.Response;
import com.squareup.okhttp.ResponseBody;
import interfaces.ErrorListener;
import interfaces.ResponseListener;
import java.io.IOException;

public class ClientIDE {
    private OkHttpClient httpClient = new OkHttpClient();
    private ResponseListener responseListener;
    private ErrorListener errorListener;
    
    public ClientIDE(String url, String json, ResponseListener responseListener, ErrorListener errorListener) {
        this.responseListener = responseListener;
        this.errorListener = errorListener;
        Request request = new Request.Builder()
                .url(url)
                .build();
        httpClient.newCall(request).enqueue(cb);
    }
    
    Callback cb = new Callback() {
        @Override
        public void onFailure(Request rqst, IOException e) {
            if (errorListener != null) {
                errorListener.onError(600, e.getMessage());
            }
        }

        @Override
        public void onResponse(Response rspns) throws IOException {
            try {
                try (ResponseBody responseBody = rspns.body()) {
                    if (rspns.isSuccessful()) {
                        if (responseListener != null) {
                            responseListener.onResponse(responseBody.string());
                        }
                    } else {
                        if (errorListener != null) {
                            errorListener.onError(rspns.code(), rspns.message());
                        }
                    }
                }
            } catch (IOException e) {
                if (errorListener != null) {
                    errorListener.onError(601, e.getMessage());
                }
            }
        }
    };

}
