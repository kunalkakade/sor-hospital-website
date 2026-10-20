# Google Business Profile — Setup Pack (Niramay Hospital)

Work through this top to bottom. Every value below is set to **exactly match the website
schema** (`index.html`) and `llms.txt`. Google cross-checks GBP against the site — identical
Name/Address/Phone (NAP) and matching services is a direct local-ranking signal. Do not
paraphrase; copy-paste.

> What only you can do: claim the listing, pass verification (video/postcard), upload photos,
> post updates. Everything you need for those steps is pre-filled here.

---

## 0. Account hygiene (do first)
- Use a **dedicated Google account** for the practice (e.g. `niramayhospital@gmail.com`), not a
  personal one. This account becomes the **owner** — guard the password, enable 2FA.
- Never create a second listing for the same clinic → triggers suspension. If a stale
  auto-generated listing exists, **claim it**, don't add new.

---

## 1. Claim / create
1. Go to **google.com/business** → sign in with the practice account.
2. Search **"Niramay Hospital Akola"**.
   - If it appears → **Claim this business**.
   - If not → **Add your business to Google**.
3. Business name — enter **exactly what is on the clinic signboard**. Do not add keywords like
   "best cancer Akola" → suspension risk. Likely:
   ```
   Niramay Hospital
   ```
   (If the board reads "Niramay Hospital - Advanced Cancer Care Centre", use that verbatim.)

---

## 2. Verification
- Doctors/clinics usually get **video verification**. You record one **unbroken** clip showing:
  1. Exterior **signboard** with the business name visible
  2. The street / surroundings (proves location)
  3. Walk inside → reception → a consultation room
  4. Proof of management — open a drawer, point to letterhead/prescription pad, or the billing screen
- Keep it under 2 min, steady, daylight. Don't stop recording mid-way.
- If offered **postcard** instead, expect 5-14 days for the code.
- Edits stay pending until verified — that's normal.

---

## 3. Core profile — exact values

| Field | Value (copy exactly) |
|---|---|
| **Primary category** | `Oncologist` |
| **Secondary categories** | `Surgical oncologist`, `Cancer treatment center`, `Surgeon`, `Hospital` |
| **Address** | Near Kelkar Hospital, GG Agarkar Marg, Ramdaspeth, Akola, Maharashtra 444001, India |
| **Phone (primary)** | +91 724 2411386 |
| **Phone (additional)** | +91 99224 60229  *(this is the WhatsApp mobile)* |
| **Email** | niramaycancercare@gmail.com |
| **Website** | https://niramay-hospital.co.in |
| **Hours** | Mon-Sat 11:00 AM – 3:00 PM · Sunday: "By appointment" (set Closed + add note, or Open with appointment) |
| **Service area** | Akola, Washim, Buldhana, Amravati (Vidarbha, Maharashtra) |

**Map pin:** drag it to the **exact clinic entrance**, not the street centroid. (Site schema geo is
approximate `20.7050, 77.0090` — once you place the real pin, tell me the coords and I'll update the
site to match.)

**Attributes** (toggle on what's true):
- Identifies as / languages: **Marathi, Hindi, English**
- Appointments **recommended/required**
- **Online care** / online appointments: Yes (video consults)
- Wheelchair-accessible entrance: *(set per reality)*
- Toilet available, Has parking: *(set per reality)*

---

## 4. Description  (Edit profile → Description · 750-char limit)

```
निरामय हॉस्पिटल — अकोल्यातील प्रगत कर्करोग उपचार केंद्र (Advanced Cancer Care Centre). डॉ. प्रसाद सोर (MS, DNB सर्जिकल ऑन्कॉलॉजी; टाटा मेमोरियल सेंटर, मुंबई फेलोशिप) हे १४+ वर्षांचा अनुभव असलेले कर्करोग शस्त्रक्रिया तज्ज्ञ (cancer surgeon) आहेत. डॉ. श्रद्धा सोर या स्त्री-कर्करोग (gynaecologic oncology) तज्ज्ञ आहेत.

आम्ही स्तन, मुख/तोंड, डोके–मान, गर्भाशयमुख आणि पचनसंस्थेच्या कर्करोगावर शस्त्रक्रिया, अचूक निदान, सेकंड ओपिनियन व ऑनलाइन व्हिडिओ सल्ला देतो. सल्ला मराठी, हिंदी व इंग्रजीत. सल्ला शुल्क ₹५०० (क्लिनिक व ऑनलाइन दोन्ही).

पत्ता: केळकर हॉस्पिटलजवळ, जी.जी. आगरकर मार्ग, रामदासपेठ, अकोला ४४४००१. वेळ: सोम–शनि, सकाळी ११ ते दुपारी ३ (रविवार अपॉइंटमेंटने). बुकिंग: ☎ +९१ ७२४ २४११३८६.
```

---

## 5. Services  (Edit services → under "Oncologist" → add custom service · name + description each)

These mirror the 6 `MedicalProcedure` entries in the site schema — keep them identical.

| Service name | Marathi description |
|---|---|
| स्तन कर्करोग शस्त्रक्रिया (Breast cancer) | स्तनाच्या कर्करोगावर लंपेक्टॉमी, मास्टेक्टॉमी व ऑन्कोप्लास्टिक शस्त्रक्रिया. लवकर निदान व स्तन-वाचवणारे उपचार. |
| मुख / तोंडाचा कर्करोग (Oral cancer) | तंबाखूमुळे होणाऱ्या मुख व जिभेच्या कर्करोगावर शस्त्रक्रिया. विदर्भात सर्वाधिक आढळणारा कर्करोग. |
| डोके व मान कर्करोग (Head & neck) | घसा, थायरॉईड, लाळग्रंथीच्या कर्करोगावर तज्ज्ञ शस्त्रक्रिया व उपचार. |
| गर्भाशयमुख व स्त्री-कर्करोग (Gynaec) | गर्भाशयमुख, गर्भाशय व अंडाशयाच्या कर्करोगावर उपचार — डॉ. श्रद्धा सोर. |
| पचनसंस्थेचा कर्करोग (GI cancer) | पोट, आतडे, यकृत, अन्ननलिकेच्या कर्करोगावर शस्त्रक्रिया व उपचार. |
| सेकंड ओपिनियन व ऑनलाइन सल्ला | रिपोर्ट पाठवा, प्रामाणिक स्वतंत्र मत मिळवा. घरबसल्या व्हिडिओ सल्ला. |

---

## 6. Photos  (upload from `assets/` — real photos beat stock, biggest trust lever)

| GBP photo slot | File |
|---|---|
| **Exterior** / cover | `assets/facility/exterior.jpg` |
| Logo / identity | `assets/dr-prasad-sor.jpg` |
| Reception | `assets/facility/reception.jpg` |
| Consultation room | `assets/facility/consultation-cabin.jpg` |
| Operation theatre | `assets/facility/operation-theatre.jpg` |
| OT complex | `assets/facility/ot-complex.jpg` |
| Equipment — laparoscopy | `assets/facility/laparoscopy.jpg` |
| Equipment — anaesthesia | `assets/facility/anaesthesia.jpg` |
| Ward | `assets/facility/ward.jpg` |
| Team — Dr. Prasad Sor | `assets/dr-prasad-sor.jpg` |
| Team — Dr. Shraddha Sor | `assets/dr-shraddha-sor.jpg` |

Aim 10+ at launch, add 1-2 monthly (Google favours active profiles).

---

## 7. Q&A — seed yourself  (post question from a second account, answer from owner account)

- **प्र: अपॉइंटमेंट कशी घ्यावी?** → उ: थेट फोन/व्हॉट्सअॅप करा ☎ +९१ ७२४ २४११३८६. रेफरल लागत नाही.
- **प्र: सल्ला शुल्क किती?** → उ: ₹५०० — क्लिनिक व ऑनलाइन दोन्हीसाठी.
- **प्र: ऑनलाइन सल्ला मिळतो का?** → उ: हो, व्हिडिओ सल्ला उपलब्ध. अकोल्याबाहेरील रुग्ण व फॉलोअपसाठी सोयीचे.
- **प्र: सेकंड ओपिनियन मिळेल का?** → उ: हो. रिपोर्ट व सध्याचा उपचार-सल्ला शेअर करा; स्वतंत्र प्रामाणिक मत मिळेल.
- **प्र: आयुष्मान भारत / विमा चालतो का?** → उ: _(fill per actual policy)_

---

## 8. Reviews  (single biggest local-rank factor for clinics)

- Ask satisfied patients in person / via WhatsApp. Steady trickle, **not** a burst (bursts look fake).
- Share your review short-link (Google gives one in the dashboard) on WhatsApp.
- **Reply to every review** in Marathi:
  - Positive: `मनापासून धन्यवाद 🙏 तुमचा विश्वास हीच आमची प्रेरणा. प्रकृतीची काळजी घ्या. — निरामय हॉस्पिटल`
  - Critical: `तुमचा अनुभव सांगितल्याबद्दल धन्यवाद. कृपया ☎ +९१ ७२४ २४११३८६ वर संपर्क करा, आम्ही मदत करू.`

---

## 9. Posts — weekly  (Add update; rotate these, then write fresh)

1. **जनजागृती:** तोंडात ३ आठवड्यांहून जास्त न भरणारी जखम? दुर्लक्ष करू नका — मुखाच्या कर्करोगाचे लक्षण असू शकते. वेळेत तपासणी करा. ☎ +९१ ७२४ २४११३८६
2. **सेवा:** स्तन कर्करोग — लवकर निदान झाल्यास स्तन वाचवणारी शस्त्रक्रिया शक्य. अकोल्यात तज्ज्ञ उपचार. बुकिंग: निरामय हॉस्पिटल.
3. **सुविधा:** अकोल्याबाहेर आहात? घरबसल्या ऑनलाइन व्हिडिओ सल्ला — रिपोर्ट दाखवा, मार्गदर्शन मिळवा. ₹५०० फक्त.

---

## 10. After it's live — close the loop with the site

1. Copy the GBP / Google Maps **place URL** → send it to me. I'll add it to the site schema
   `sameAs` so the two entities link (strengthens both).
2. Give me the **exact map-pin coordinates** → I'll update the site geo + meta tags to match.
3. Keep hours accurate around festivals.
4. Check **"suggested edits"** monthly — Google lets strangers edit your listing; reject wrong ones.

---

### Field-match checklist (must be identical GBP ↔ site)
- [ ] Name matches signboard
- [ ] Address matches `index.html` schema, char-for-char
- [ ] Phone +91 724 2411386 = site `tel:` / schema `telephone`
- [ ] WhatsApp +91 99224 60229 = site `wa.me/919922460229`
- [ ] Website https://niramay-hospital.co.in
- [ ] 6 services = the 6 in schema `availableService`
- [ ] Hours Mon-Sat 11-3 = schema `openingHoursSpecification`
