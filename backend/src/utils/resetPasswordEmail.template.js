export const generateResetPasswordTemplate = (otp, expiresInMinutes = 10) => `
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <title>Reset your Smart Home password</title>
    <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
</head>

<body style="margin:0;padding:0;background:#e8f0fc;">

<!-- Preheader (shows next to the subject in the inbox) -->
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:#e8f0fc;">
    Your password reset code is ${otp}. It expires in ${expiresInMinutes} minutes.
</div>

<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#e8f0fc;">
    <tr>
        <td align="center" style="padding:40px 15px;">

            <table
                width="600"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
                style="
                    width:100%;
                    max-width:600px;
                    background:#ffffff;
                    border:1.5px solid #ffffff;
                    border-radius:28px;
                    overflow:hidden;
                    box-shadow:0 16px 36px rgba(18,58,122,.12),0 2px 6px rgba(18,58,122,.05);
                "
            >

                <!-- Header -->
                <tr>
                    <td
                        align="center"
                        bgcolor="#0b2c63"
                        style="
                            padding:34px 30px 30px;
                            background:#0b2c63;
                            background-image:linear-gradient(180deg,#071f45,#0b2c63 45%,#0f397d 80%,#124391);
                            font-family:Poppins,Cairo,Arial,sans-serif;
                            color:#ffffff;
                        "
                    >
                        <div style="font-size:40px;line-height:1;margin-bottom:10px;">🏠</div>
                        <div style="font-size:21px;font-weight:700;line-height:1.25;color:#ffffff;">
                            Smart Home Automation
                        </div>
                        <div style="margin-top:6px;font-size:13.5px;font-style:italic;color:#c2d7f8;">
                            Smarter Home.. Greater Comfort
                        </div>
                    </td>
                </tr>

                <!-- Body -->
                <tr>
                    <td
                        style="
                            padding:36px 36px 32px;
                            background:#f7faff;
                            font-family:Poppins,Cairo,Arial,sans-serif;
                            color:#0b2a5b;
                        "
                    >

                        <!-- Title with teal accent bar -->
                        <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 0 18px;">
                            <tr>
                                <td style="border-left:5px solid #0e8f8f;padding-left:14px;">
                                    <h1 style="margin:0;font-size:26px;font-weight:700;line-height:1.2;color:#0b2a5b;letter-spacing:-.3px;">
                                        Reset your password
                                    </h1>
                                    <p style="margin:4px 0 0;font-size:14px;font-weight:500;color:#4b6691;">
                                        Verify • Reset • Sign in
                                    </p>
                                </td>
                            </tr>
                        </table>

                        <p style="margin:0 0 26px;font-size:15px;line-height:1.7;color:#48628b;">
                            We received a request to reset the password for your Smart Home account.
                            Enter the code below in the app to choose a new password.
                        </p>

                        <!-- OTP box -->
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                                <td align="center">
                                    <table cellpadding="0" cellspacing="0" role="presentation">
                                        <tr>
                                            <td
                                                align="center"
                                                bgcolor="#edf4fe"
                                                style="
                                                    padding:18px 34px;
                                                    background:#edf4fe;
                                                    border:1.5px solid #cce0fc;
                                                    border-radius:20px;
                                                    font-family:Poppins,Arial,sans-serif;
                                                    font-size:34px;
                                                    font-weight:700;
                                                    letter-spacing:10px;
                                                    color:#0b2a5b;
                                                "
                                            >
                                                ${otp}
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        </table>

                        <!-- Expiry pill -->
                        <p style="margin:18px 0 0;text-align:center;">
                            <span
                                style="
                                    display:inline-block;
                                    padding:6px 14px;
                                    background:#e6f7ee;
                                    border:1px solid #bfe9d3;
                                    border-radius:14px;
                                    font-size:13px;
                                    font-weight:600;
                                    color:#12875b;
                                "
                            >
                                ⏱ This code expires in ${expiresInMinutes} minutes
                            </span>
                        </p>

                        <!-- Security note -->
                        <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:28px;">
                            <tr>
                                <td
                                    bgcolor="#edf4fe"
                                    style="
                                        padding:14px 16px;
                                        background:#edf4fe;
                                        border:1px solid #cce0fc;
                                        border-radius:16px;
                                        font-size:13px;
                                        line-height:1.6;
                                        color:#50709f;
                                    "
                                >
                                    <strong style="color:#0c2d60;">Didn't request this?</strong>
                                    You can safely ignore this email. Your password won't change, and
                                    never share this code with anyone.
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>

                <!-- Footer -->
                <tr>
                    <td
                        align="center"
                        bgcolor="#0b2a5b"
                        style="
                            padding:18px 30px;
                            background:#0b2a5b;
                            background-image:linear-gradient(180deg,#08244e,#103977);
                            font-family:Poppins,Cairo,Arial,sans-serif;
                            font-size:12px;
                            color:#bad5fc;
                        "
                    >
                        Made by Diaa Reda — Smart Home Automation 🏠
                    </td>
                </tr>

            </table>

        </td>
    </tr>
</table>

</body>
</html>
`;
