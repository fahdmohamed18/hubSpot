# Integrating With HubSpot I: Foundations – Practicum Submission

## 1) Environment
- Developer Account + Test Account (لقطة شاشة للـ account switcher داخل HubSpot).
- اسم/ID الـ Test Account: اذكره هنا.

## 2) Private App
- Scopes: `crm.objects.contacts.read`, `crm.objects.contacts.write`
- Screenshot: صفحة الـ Private App → Auth tab (بدون إظهار التوكن).

## 3) Implementation (Inside HubSpot)
- Workflow: Contact-based.
- Action: Custom Code (Node.js).
- NPM packages: `@hubspot/api-client`.
- Secret: `HUBSPOT_ACCESS_TOKEN` (لا تُعرض القيمة).
- Inputs mapping: `email`, `firstname`, `lastname`.
- الكود المستخدم: موجود في `custom-code.js` (مرجع).

## 4) Test Evidence
- Enrolled Contact: لقطة شاشة.
- Workflow History: يظهر `action=created` أو `action=updated` مع `contactId`.
- CRM Contact record: لقطة بعد التنفيذ.

## 5) How to Reproduce
1. أنشئ Contact بإيميل تجريبي.
2. Enroll في الـ Workflow يدويًا.
3. راقب History وتحقق من سجل الكونتاكت.

## 6) Notes
- لا تشارك التوكن أو أي أسرار.
- كل التنفيذ تم داخل HubSpot بدون سيرفر خارجي.
