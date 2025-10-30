# HubSpot Foundations Practicum (Inside HubSpot Workflow)

تنفيذ متكامل داخل HubSpot بدون سيرفر خارجي، باستخدام:
- Workflow (Contact-based)
- Custom Code Action (Node.js) مع الحزمة `@hubspot/api-client`
- Secret لحقن توكن الـ Private App داخل الأكشن

## المتطلبات
- Test Account داخل HubSpot (من Developer Account)
- Private App داخل الـ Test Account بصلاحيات:
  - `crm.objects.contacts.read`
  - `crm.objects.contacts.write`
- ممنوع مشاركة أو رفع التوكن علناً.

## الإعداد داخل HubSpot
1) إنشاء Workflow:
- Automation → Workflows → Create workflow → From scratch → Contact-based.
- Trigger: Manual enrollment (للتجربة أولاً).

2) Custom Code Action:
- Add action → Custom code.
- Runtime: Node.js.
- Use npm packages: ON.
- الحزم: `@hubspot/api-client`
- Secrets:
  - Key: `HUBSPOT_ACCESS_TOKEN`
  - Value: ضع قيمة التوكن من Private App (لا تعرضها).
- Inputs:
  - `email` ← Contact property: Email
  - `firstname` ← Contact property: First name
  - `lastname` ← Contact property: Last name

3) كود الأكشن:
- انسخ محتوى `custom-code.js` من هذا الريبو داخل الأكشن كما هو.

4) التشغيل:
- اضغط Save ثم Turn on.
- أنشئ Contact تجريبي أو اختر موجود.
- Enroll الكونتاكت في الـ Workflow.

## الاختبار المتوقع
- الأكشن يبحث عن الكونتاكت بالإيميل:
  - لو موجود: Update لخصائص الاسم.
  - لو غير موجود: Create.
- راقب Workflow → History:
  - سترى `action=created` أو `action=updated` مع `contactId`.

## التسليم (Submission)
- التقط لقطات شاشة واحفظها في مجلد `screenshots/`:
  - إعداد الـ Test Account (بدون بيانات حساسة).
  - صفحة Private App → تبويب Auth (أخفِ التوكن).
  - إعدادات Custom Code (الحزم/الـ secret/الـ inputs).
  - Workflow History يوضح النتيجة.
  - سجل الكونتاكت بعد التنفيذ في CRM.
- راجع ملف `SUBMISSION_GUIDE.md` كقالب للتسليم.
- سلّم رابط هذا الريبو في صفحة Practicum (اختيار “Add a link”).

## ملاحظات
- لا تستخدم Legacy Apps أو API Keys القديمة.
- لا ترفع `.env` أو أي أسرار في الريبو.
- لو ظهرت أخطاء:
  - تأكد من Scopes الخاصة بالـ Private App.
  - تأكد أن اسم الـ Secret هو بالضبط `HUBSPOT_ACCESS_TOKEN`.
  - تأكد من ربط الـ Inputs بخصائص الكونتاكت صحيحة.
