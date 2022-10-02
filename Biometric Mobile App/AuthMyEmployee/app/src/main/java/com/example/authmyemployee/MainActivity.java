package com.example.authmyemployee;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.biometric.BiometricPrompt;

import android.content.Context;
import android.graphics.Color;
import android.hardware.fingerprint.FingerprintManager;
import android.os.Build;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonArrayRequest;
import com.android.volley.toolbox.JsonObjectRequest;
import com.google.android.material.snackbar.Snackbar;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.List;
import java.util.concurrent.Executor;

public class MainActivity extends AppCompatActivity {

    Button btnAuthentication;
    TextView empAuthStatus;
    TextView empId;

    private Executor executor;
    private BiometricPrompt biometricPrompt;
    private BiometricPrompt.PromptInfo promptInfo;

    private RequestQueue requestQueue;
    Boolean res;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnAuthentication = findViewById(R.id.btnAuth);
        btnAuthentication.setEnabled(false);

        empAuthStatus = findViewById(R.id.empAuthStatus);
        empId = findViewById(R.id.emp_id);

        requestQueue = VolleySingleton.getInstance(this).getRequestQueue();

        Bundle extras = getIntent().getExtras();
        if (extras != null) {
            res = extras.getBoolean("flag",false);
            if(res){
                btnAuthentication.setText("CLOCK OUT");
            }
            else{
                btnAuthentication.setText("CLOCK IN");
            }
        }


        empId.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            }

            @Override
            public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
                if(charSequence.toString().trim().length() > 0){
                    btnAuthentication.setEnabled(true);
                }
                else{
                    btnAuthentication.setEnabled(false);
                }
            }

            @Override
            public void afterTextChanged(Editable editable) {

            }
        });

        executor = ContextCompat.getMainExecutor(this);
        biometricPrompt = new BiometricPrompt(MainActivity.this, executor,
                  new androidx.biometric.BiometricPrompt.AuthenticationCallback() {
            @Override
            public void onAuthenticationError(int errorCode, @NonNull CharSequence errString) {
                super.onAuthenticationError(errorCode, errString);
                empAuthStatus.setText("Error: "+errString);
                empId.setText("");
            }

            @Override
            public void onAuthenticationSucceeded(@NonNull androidx.biometric.BiometricPrompt.AuthenticationResult result) {
                super.onAuthenticationSucceeded(result);
                if(res){
                    ClockOut();
                }
                else{
                    ClockIn();
                }
                empId.setText("");
            }

            @Override
            public void onAuthenticationFailed() {
                super.onAuthenticationFailed();
                empAuthStatus.setText("Employee Not Verified");
            }
        });

        promptInfo = new BiometricPrompt.PromptInfo.Builder()
                .setTitle("Biometric Authentication")
                .setSubtitle("Verification using Fingerprint or face")
                .setNegativeButtonText("Cancel")
                .build();
    }

    public void EmployeeAuthentication(View view) {
        biometricPrompt.authenticate(promptInfo);
    }

    private void ClockIn(){
        String url = getResources().getString(R.string.ClockIn);
        JSONObject reqObj = new JSONObject();
        try {
            reqObj.put("employeeId",Integer.parseInt(empId.getText().toString()));
            reqObj.put("firstName","Jaspal");
            reqObj.put("lastName","Singh");
            reqObj.put("password","value");
            reqObj.put("token","value");
            reqObj.put("role","value");

        } catch (JSONException e) {
            e.printStackTrace();
        }
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, reqObj,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            if(response.getBoolean("data")){
                                Snackbar.make((findViewById(android.R.id.content)),"Employee Verified!!\nClock In", Snackbar.LENGTH_LONG)
                                        .setActionTextColor(getResources().getColor(android.R.color.black ))
                                        .setBackgroundTint(getResources().getColor(R.color.purple_500))
                                        .show();
                            }
                            else{
                                Snackbar.make((findViewById(android.R.id.content)),"Employee Not Verified!!", Snackbar.LENGTH_LONG)
                                        .setActionTextColor(getResources().getColor(android.R.color.black ))
                                        .setBackgroundTint(getResources().getColor(R.color.purple_500))
                                        .show();
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(MainActivity.this, error.getMessage(), Toast.LENGTH_LONG).show();
                    }
        });
        requestQueue.add(jsonObjectRequest);
    }

    /*
    * Send Clock out time via API to Team Savvy Database
    * */
    private void ClockOut(){
        String url = getResources().getString(R.string.ClockOut);
        JSONObject reqObj = new JSONObject();
        try {
            reqObj.put("employeeId", Integer.parseInt(empId.getText().toString()));
            reqObj.put("firstName","Jaspal");
            reqObj.put("lastName","Singh");
            reqObj.put("password","value");
            reqObj.put("token","value");
            reqObj.put("role","value");

        } catch (JSONException e) {
            e.printStackTrace();
        }
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, reqObj,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            if(response.getBoolean("data")){
                                Snackbar.make((findViewById(android.R.id.content)),"Employee Verified!!\nClock Out", Snackbar.LENGTH_LONG)
                                        .setActionTextColor(getResources().getColor(android.R.color.black ))
                                        .setBackgroundTint(getResources().getColor(R.color.purple_500))
                                        .show();
                            }
                            else{
                                Snackbar.make((findViewById(android.R.id.content)),"Employee Not Verified!!", Snackbar.LENGTH_LONG)
                                        .setActionTextColor(getResources().getColor(android.R.color.black ))
                                        .setBackgroundTint(getResources().getColor(R.color.purple_500))
                                        .show();
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(MainActivity.this, error.getMessage(), Toast.LENGTH_LONG).show();
                    }
                });
        requestQueue.add(jsonObjectRequest);
    }
}