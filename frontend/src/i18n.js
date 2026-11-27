import { base } from './base';

// Extra strings (toasts, logs, extra pages) layered on top of the original dictionary.
const extra = {
  en: {
    verifyTitle: 'Verify your email', verifySub: 'We sent a 6-digit code to', otpLabel: 'Verification code', verify: 'Verify', resend: 'Resend code', resendIn: 'Resend in', badOtp: 'Incorrect code', otpExpired: 'Code expired, request a new one', resent: 'A new code was sent', verifiedOk: 'Email verified. Sign in to continue.', forgotLink: 'Forgot password?', forgotTitle: 'Reset password', forgotSub: 'Enter your email and we will send you a code', sendCode: 'Send code', resetTitle: 'New password', resetSub: 'Enter the code sent to', newPw: 'New password', resetBtn: 'Reset password', resetOk: 'Password updated. Sign in with your new password.', verifyNow: 'Verify my email now', backToLogin: 'Back to sign in', demoOtp: 'Demo code: 123456',
    email: 'Email', deviceId: 'Device ID', signUp: 'Sign up', noAccount: "Don't have an account?", haveAccount: 'Already have an account?', signupTitle: 'Create account', signupSub: 'Register to manage your smart home', phone: 'Phone number', gender: 'Gender', male: 'Male', female: 'Female', confirmPw: 'Confirm password', createAccount: 'Create account', pwMismatch: 'Passwords do not match', notActivated: 'Account is not activated yet', deviceNotFound: 'Device ID was not found. Check the ID and try again.', signupInvalid: 'Check the entered details and try again.', requestInvalid: 'Please check the request details and try again.', emailTaken: 'Email, username or phone is already registered', serverErr: 'Something went wrong, try again', signupOk: 'Account created. Sign in to continue.',
    loginTitle: 'Welcome back', loginSub: 'Sign in to control your home', username: 'Username', password: 'Password', remember: 'Keep me signed in', signIn: 'Sign in', signingIn: 'Signing in…', showPw: 'Show password', hidePw: 'Hide password', badCreds: 'Incorrect username or password', logout: 'Sign out', demoHint: 'Demo: admin@home.com / 123456 / any Device ID', tLogout: 'Signed out',
    sUnlocked: 'Unlocked', sLocked: 'Locked', sOpen: 'Open', sClosed: 'Closed', sOn: 'ON', sOff: 'OFF',
    logDoorLocked: 'Door locked', logGateClosed: 'Parking gate closed', logFanOff: 'Fan turned OFF',
    longFan: 'Fan automatically turned ON (Ambient reading: 32°C > 30°C threshold)',
    longGate: 'Parking ultrasonic sensor triggered (Distance: 38 cm < 45 cm) — Gate raised',
    longDoor: 'Front door keypad unlocked via valid 4-digit master PIN',
    longBeat: 'System heartbeat packet transmitted to MQTT broker',
    logsTitle: 'Complete Event & Audit Logs', logsSub: 'Detailed audit trail of all hardware state changes and security events.',
    aboutTitle: 'About Smart Home Automation', aboutSub: 'Integrated embedded control system for intelligent residential management.',
    aboutBody: 'This platform connects physical IoT sensors and actuators across your residence: a keypad-secured door lock, parking access automated by ultrasonic distance detection, and ambient climate control driven by a temperature sensor and fan.',
    openDash: 'Open Dashboard', configure: 'Configure Settings',
    tDoorL: 'Door securely locked', tDoorU: 'Door lock released', tGateO: 'Parking boom gate opened', tGateC: 'Parking gate lowered',
    tFanOn: 'Cooling fan turned ON', tFanOff: 'Cooling fan stopped', tNoAlerts: 'No new unread alerts', tAdmin: 'Signed in as Admin',
    tUnit: 'Temperature unit updated', tPinOk: 'Keypad Master PIN successfully updated', tPinMismatch: 'Error: New PIN entries do not match!',
    tPinFmt: 'PIN must be 4 to 6 digits', tSaved: 'All climate & sensor thresholds saved!', tDemoOn: 'Live telemetry demo resumed',
    tDemoOff: 'Telemetry demo paused', tForce: 'Door has been forced locked', tLift: 'Gate barrier raised manually', tPing: 'Broker connection verified OK',
  },
  ar: {
    verifyTitle: 'تأكيد الإيميل', verifySub: 'بعتنا كود من 6 أرقام على', otpLabel: 'كود التأكيد', verify: 'تأكيد', resend: 'إعادة إرسال الكود', resendIn: 'إعادة الإرسال بعد', badOtp: 'الكود غلط', otpExpired: 'الكود انتهت صلاحيته، اطلب كود جديد', resent: 'تم إرسال كود جديد', verifiedOk: 'تم تأكيد الإيميل. سجّل دخولك.', forgotLink: 'نسيت كلمة المرور؟', forgotTitle: 'استرجاع كلمة المرور', forgotSub: 'اكتب إيميلك وهنبعتلك كود', sendCode: 'إرسال الكود', resetTitle: 'كلمة مرور جديدة', resetSub: 'اكتب الكود اللي وصل على', newPw: 'كلمة المرور الجديدة', resetBtn: 'تغيير كلمة المرور', resetOk: 'تم تغيير كلمة المرور. سجّل دخولك بالجديدة.', verifyNow: 'أكّد الإيميل دلوقتي', backToLogin: 'الرجوع لتسجيل الدخول', demoOtp: 'كود تجريبي: 123456',
    email: 'البريد الإلكتروني', deviceId: 'رقم الجهاز (Device ID)', signUp: 'إنشاء حساب', noAccount: 'معندكش حساب؟', haveAccount: 'عندك حساب؟', signupTitle: 'إنشاء حساب', signupSub: 'سجّل عشان تتحكم في بيتك الذكي', phone: 'رقم الموبايل', gender: 'النوع', male: 'ذكر', female: 'أنثى', confirmPw: 'تأكيد كلمة المرور', createAccount: 'إنشاء الحساب', pwMismatch: 'كلمتين المرور مش متطابقين', notActivated: 'الحساب لسه متفعّلش', deviceNotFound: 'رقم الجهاز مش موجود في النظام. راجع الرقم وحاول تاني.', signupInvalid: 'راجع البيانات اللي دخلتها وحاول تاني.', requestInvalid: 'راجع البيانات وحاول تاني.', emailTaken: 'الإيميل أو اسم المستخدم أو الموبايل مسجّل قبل كده', serverErr: 'حصلت مشكلة، حاول تاني', signupOk: 'تم إنشاء الحساب. سجّل دخولك.',
    loginTitle: 'أهلًا بعودتك', loginSub: 'سجّل دخولك للتحكم في بيتك', username: 'اسم المستخدم', password: 'كلمة المرور', remember: 'خليني مسجّل', signIn: 'دخول', signingIn: 'جاري الدخول…', showPw: 'إظهار كلمة المرور', hidePw: 'إخفاء كلمة المرور', badCreds: 'اسم المستخدم أو كلمة المرور غلط', logout: 'تسجيل الخروج', demoHint: 'تجريبي: admin@home.com / 123456 / أي Device ID', tLogout: 'تم تسجيل الخروج',
    sUnlocked: 'مفتوح', sLocked: 'مقفول', sOpen: 'مفتوحة', sClosed: 'مقفولة', sOn: 'شغالة', sOff: 'مطفية',
    logDoorLocked: 'تم قفل الباب', logGateClosed: 'تم إغلاق بوابة الموقف', logFanOff: 'تم إيقاف المروحة',
    longFan: 'تم تشغيل المروحة تلقائيًا (القراءة 32°م أعلى من حد 30°م)',
    longGate: 'حساس الألتراسونيك اشتغل (المسافة 38 سم أقل من 45 سم) — تم رفع البوابة',
    longDoor: 'تم فتح باب المدخل بالرقم السري الصحيح من لوحة الأرقام',
    longBeat: 'تم إرسال نبضة اتصال النظام إلى وسيط MQTT',
    logsTitle: 'سجل الأحداث الكامل', logsSub: 'تفاصيل كل تغييرات الأجهزة والأحداث الأمنية.',
    aboutTitle: 'عن أتمتة المنزل الذكي', aboutSub: 'نظام تحكم مدمج لإدارة المنزل بذكاء.',
    aboutBody: 'المنصة دي بتربط الحساسات والمشغّلات في بيتك: قفل الباب بلوحة أرقام، وبوابة الموقف بحساس ألتراسونيك، والتحكم في الحرارة بحساس ومروحة.',
    openDash: 'افتح لوحة التحكم', configure: 'ضبط الإعدادات',
    tDoorL: 'تم قفل الباب', tDoorU: 'تم فتح الباب', tGateO: 'تم رفع البوابة', tGateC: 'تم إنزال البوابة',
    tFanOn: 'تم تشغيل المروحة', tFanOff: 'تم إيقاف المروحة', tNoAlerts: 'مفيش تنبيهات جديدة', tAdmin: 'مسجّل الدخول كمدير',
    tUnit: 'تم تغيير وحدة الحرارة', tPinOk: 'تم تحديث الرقم السري', tPinMismatch: 'الرقمين الجداد مش متطابقين',
    tPinFmt: 'الرقم السري من 4 لـ 6 أرقام', tSaved: 'تم حفظ الإعدادات', tDemoOn: 'تم تشغيل المحاكاة',
    tDemoOff: 'تم إيقاف المحاكاة', tForce: 'تم قفل الباب إجباريًا', tLift: 'تم رفع الحاجز يدويًا', tPing: 'تم التأكد من الاتصال بالوسيط',
  },
};

export default { en: { ...base.en, ...extra.en }, ar: { ...base.ar, ...extra.ar } };
