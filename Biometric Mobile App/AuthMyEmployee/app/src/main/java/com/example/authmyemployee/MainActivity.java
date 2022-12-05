package com.example.authmyemployee;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.ContextCompat;
import androidx.biometric.BiometricPrompt;

import android.content.Context;
import android.content.Intent;
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
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.Executor;

public class MainActivity extends AppCompatActivity {

    Button btnAuthentication;
    Button btnClose;
    TextView empAuthStatus;
    TextView empId;

    private Executor executor;
    private BiometricPrompt biometricPrompt;
    private BiometricPrompt.PromptInfo promptInfo;

    private RequestQueue requestQueue;
    Boolean res;
    boolean flag = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        btnAuthentication = findViewById(R.id.btnAuth);
        btnAuthentication.setText("AUTHENTICATE EMPLOYEE");
        btnAuthentication.setEnabled(false);
        btnClose = findViewById(R.id.btnClose);
        findViewById(R.id.emp_id).setEnabled(true);
        btnClose.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                finish();
                System.exit(0);
                findViewById(R.id.emp_id).setEnabled(true);
            }
        });

        empAuthStatus = findViewById(R.id.empAuthStatus);
        empId = findViewById(R.id.emp_id);

        requestQueue = VolleySingleton.getInstance(this).getRequestQueue();

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
                    btnAuthentication.setText("AUTHENTICATE EMPLOYEE");
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

            @RequiresApi(api = Build.VERSION_CODES.O)
            @Override
            public void onAuthenticationSucceeded(@NonNull androidx.biometric.BiometricPrompt.AuthenticationResult result) {
                super.onAuthenticationSucceeded(result);
                if(btnAuthentication.getText().toString().equals("AUTHENTICATE EMPLOYEE"))
                {
                    GetEmployeeData(empId.getText().toString());
                }
                if(btnAuthentication.getText().toString().equals("CLOCK OUT")){
                    ClockOut();
                    empId.setText("");
                    btnAuthentication.setText("AUTHENTICATE EMPLOYEE");
                    findViewById(R.id.emp_id).setEnabled(true);
                }
                if(btnAuthentication.getText().toString().equals("CLOCK IN")){
                    ClockIn();
                    empId.setText("");
                    btnAuthentication.setText("AUTHENTICATE EMPLOYEE");
                    findViewById(R.id.emp_id).setEnabled(true);
                }

            }

            @Override
            public void onAuthenticationFailed() {
                super.onAuthenticationFailed();
                empAuthStatus.setText("Finger print is not from trusted source");
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

    /*
     * Send Clock In time via API to Team Savvy Database
     * */
    @RequiresApi(api = Build.VERSION_CODES.O)
    private void ClockIn(){
        String url = getResources().getString(R.string.ClockIn);
        JSONObject reqObj = new JSONObject();
        try {
            LocalDate dateObj = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String date = dateObj.format(formatter);
            LocalTime localTime = LocalTime.now();
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("hh:mm a");
            String time = localTime.format(dateTimeFormatter);
            reqObj.put("employeeId", Integer.parseInt(empId.getText().toString()));
            reqObj.put("clockDate", date);
            reqObj.put("clockTime",time);
            reqObj.put("clockType","Clock-In");

        } catch (JSONException e) {
            e.printStackTrace();
        }
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, reqObj,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            if(response.getBoolean("success")){
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
    @RequiresApi(api = Build.VERSION_CODES.O)
    private void ClockOut(){
        String url = getResources().getString(R.string.ClockOut);
        JSONObject reqObj = new JSONObject();
        try {
            LocalDate dateObj = LocalDate.now();
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
            String date = dateObj.format(formatter);
            LocalTime localTime = LocalTime.now();
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("hh:mm a");
            String time = localTime.format(dateTimeFormatter);
            reqObj.put("employeeId", Integer.parseInt(empId.getText().toString()));
            reqObj.put("clockDate",date);
            reqObj.put("clockTime",time);
            reqObj.put("clockType","Clock-Out");

        } catch (JSONException e) {
            e.printStackTrace();
        }
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.POST, url, reqObj,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            if(response.getBoolean("success")){
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

    private void GetEmployeeData(String empId) {
        String url = getResources().getString(R.string.GetData) + '/' + empId;
        JsonObjectRequest jsonObjectRequest = new JsonObjectRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONObject>() {

                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            if(response.getBoolean("success") == true)
                            {
                                if(response.getString("response").equals("ClockOut"))
                                {
                                    btnAuthentication.setText("CLOCK OUT");
                                }
                                else
                                {
                                    btnAuthentication.setText("CLOCK IN");
                                }

                                findViewById(R.id.emp_id).setEnabled(false);
                            }

                            if(response.getBoolean("success") == false)
                            {
                                Snackbar.make((findViewById(android.R.id.content)),"Employee not exist!!", Snackbar.LENGTH_LONG)
                                        .setActionTextColor(getResources().getColor(android.R.color.black ))
                                        .setBackgroundTint(getResources().getColor(R.color.purple_500))
                                        .show();
                            }
                        } catch (JSONException e) {
                            e.printStackTrace();
                            Snackbar.make((findViewById(android.R.id.content)),"Employee not exist!!", Snackbar.LENGTH_LONG)
                                    .setActionTextColor(getResources().getColor(android.R.color.black ))
                                    .setBackgroundTint(getResources().getColor(R.color.purple_500))
                                    .show();
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