const forgotPasswordTemplate = (url) => {
return `<!DOCTYPE html>	
<html>	
<head>
    <meta charset="UTF-8">
    <title>OTP Verification Email</title>
    <style>
        body {
            background-color: #ffffff;
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.4;
            color: #333333;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }

        .logo {
            max-width: 300px;
            margin-bottom: 20px;
        }

        .message {
            font-size: 18px;
            font-weight: bold;
            margin-bottom: 20px;
        }

        .body {
            font-size: 16px;
            margin-bottom: 20px;
        }

        .cta {
            display: inline-block;
            padding: 10px 20px;
            background-color: #FFD60A;
            color: #000000;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            margin-top: 20px;
        }

        .support {
            font-size: 14px;
            color: #999999;
            margin-top: 20px;
        }

        .highlight {
            font-size: 14px;
            font-weight: bold;
        }
    </style>

</head>

<body>
    <div class="container">
        <a href="" ><img class="logo"
                src="https://res.cloudinary.com/dstipficg/image/upload/v1701520582/media/photo-20230918-114700removebgpreview-1_2x_lkknqc.png" alt="Quizeon Logo"></a>
        <div class="message">Update Password Email</div>
        <div class="body">
            <p>Dear User,</p>
            <p>If you forgotten your password the given url is valid for 5 minutes for Update your password. To complete your password updation, please use the following Link :</p>
            <h2 class="highlight">url : ${url}</h2>
            <p>This is valid for 5 minutes. If you did not request this Updation, please disregard this email.
            Once your account is verified, you will have access to our platform and its features.</p>
        </div>
        <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                href="mailto:vishalbavakumar0000@gmail.com">info@Quizeon.com</a>. We are here to help!</div>
    </div>
</body>

</html>`;
};

module.exports = forgotPasswordTemplate;