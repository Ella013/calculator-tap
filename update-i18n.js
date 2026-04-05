const fs = require('fs');
const path = require('path');

const newKeys = {
  en: {
    footer: {
      privacyPolicy: "Privacy Policy",
      terms: "Terms",
      about: "About",
      contact: "Contact",
      sitemap: "Sitemap"
    },
    sidebar: {
      otherCalculators: "Other Calculators"
    },
    pages: {
      contact: {
        headerTitle: "Contact Us",
        headerSubtitle: "We'd love to hear from you. Whether you have a question, feedback, or a partnership idea — reach out anytime.",
        breadcrumbHome: "Home",
        breadcrumbContact: "Contact",
        touchTitle: "Get in Touch",
        touchText: "The best way to reach us is by email. We typically respond within 1–2 business days.",
        touchText2: "Please include as much detail as possible so we can help you quickly.",
        helpTitle: "What Can We Help With?",
        topic1Title: "Calculator Feedback",
        topic1Desc: "Found an issue or want a new feature? Tell us and we'll look into it.",
        topic2Title: "Bug Reports",
        topic2Desc: "Spotted something off in a calculation result? Let us know the details.",
        topic3Title: "Suggestions",
        topic3Desc: "Have an idea for a new calculator or an improvement? We're all ears.",
        topic4Title: "Partnerships",
        topic4Desc: "Interested in collaborating or advertising? Send us a message.",
        faqTitle: "Frequently Asked Questions",
        faq1Q: "Are your calculators free to use?",
        faq1A: "Yes — all Calculator Tap tools are completely free with no sign-up required.",
        faq2Q: "Do you store my financial data?",
        faq2A: "No. All calculations happen in your browser. We never store, collect, or share your financial data.",
        faq3Q: "Can I request a new calculator?",
        faq3A: "Absolutely. Send us a message at the email above and we'll consider it for a future update."
      }
    }
  },
  ko: {
    footer: {
      privacyPolicy: "개인정보처리방침",
      terms: "이용약관",
      about: "소개",
      contact: "문의하기",
      sitemap: "사이트맵"
    },
    sidebar: {
      otherCalculators: "다른 계산기"
    },
    pages: {
      contact: {
        headerTitle: "문의하기",
        headerSubtitle: "질문, 피드백, 또는 파트너십 아이디어가 있으시면 언제든지 연락주세요.",
        breadcrumbHome: "홈",
        breadcrumbContact: "문의",
        touchTitle: "연락처",
        touchText: "이메일로 연락하는 것이 가장 좋습니다. 보통 1–2 영업일 이내에 답변드립니다.",
        touchText2: "빠른 도움을 위해 가능한 자세한 내용을 포함해 주세요.",
        helpTitle: "어떤 도움이 필요하신가요?",
        topic1Title: "계산기 피드백",
        topic1Desc: "문제를 발견하셨거나 새 기능을 원하시나요? 알려주시면 검토하겠습니다.",
        topic2Title: "버그 신고",
        topic2Desc: "계산 결과에 오류가 있나요? 세부 내용을 알려주세요.",
        topic3Title: "제안",
        topic3Desc: "새 계산기나 개선 아이디어가 있으신가요? 언제든지 환영합니다.",
        topic4Title: "파트너십",
        topic4Desc: "협업이나 광고에 관심이 있으신가요? 메시지를 보내주세요.",
        faqTitle: "자주 묻는 질문",
        faq1Q: "계산기는 무료인가요?",
        faq1A: "네 — 모든 Calculator Tap 도구는 회원가입 없이 완전히 무료입니다.",
        faq2Q: "제 금융 데이터를 저장하나요?",
        faq2A: "아니요. 모든 계산은 브라우저에서 이루어집니다. 금융 데이터를 저장, 수집 또는 공유하지 않습니다.",
        faq3Q: "새 계산기를 요청할 수 있나요?",
        faq3A: "물론입니다. 위 이메일로 메시지를 보내주시면 향후 업데이트 시 검토하겠습니다."
      }
    }
  },
  es: {
    footer: {
      privacyPolicy: "Política de Privacidad",
      terms: "Términos",
      about: "Acerca de",
      contact: "Contacto",
      sitemap: "Mapa del Sitio"
    },
    sidebar: {
      otherCalculators: "Otras Calculadoras"
    },
    pages: {
      contact: {
        headerTitle: "Contáctenos",
        headerSubtitle: "Nos encantaría escuchar de usted. Ya sea que tenga una pregunta, comentarios o una idea de asociación — comuníquese con nosotros en cualquier momento.",
        breadcrumbHome: "Inicio",
        breadcrumbContact: "Contacto",
        touchTitle: "Póngase en Contacto",
        touchText: "La mejor manera de comunicarse con nosotros es por correo electrónico. Normalmente respondemos dentro de 1 a 2 días hábiles.",
        touchText2: "Incluya todos los detalles posibles para que podamos ayudarle rápidamente.",
        helpTitle: "¿En Qué Podemos Ayudarle?",
        topic1Title: "Comentarios sobre la Calculadora",
        topic1Desc: "¿Encontró un problema o desea una nueva función? Díganos y lo investigaremos.",
        topic2Title: "Informes de Errores",
        topic2Desc: "¿Notó algo incorrecto en un resultado de cálculo? Háganos saber los detalles.",
        topic3Title: "Sugerencias",
        topic3Desc: "¿Tiene una idea para una nueva calculadora o una mejora? Los escuchamos.",
        topic4Title: "Asociaciones",
        topic4Desc: "¿Está interesado en colaborar o en publicidad? Envíenos un mensaje.",
        faqTitle: "Preguntas Frecuentes",
        faq1Q: "¿Son gratuitas sus calculadoras?",
        faq1A: "Sí — todas las herramientas de Calculator Tap son completamente gratuitas sin necesidad de registrarse.",
        faq2Q: "¿Almacenan mis datos financieros?",
        faq2A: "No. Todos los cálculos se realizan en su navegador. Nunca almacenamos, recopilamos ni compartimos sus datos financieros.",
        faq3Q: "¿Puedo solicitar una nueva calculadora?",
        faq3A: "Por supuesto. Envíenos un mensaje al correo electrónico anterior y lo consideraremos para una actualización futura."
      }
    }
  },
  zh: {
    footer: {
      privacyPolicy: "隐私政策",
      terms: "条款",
      about: "关于",
      contact: "联系我们",
      sitemap: "网站地图"
    },
    sidebar: {
      otherCalculators: "其他计算器"
    },
    pages: {
      contact: {
        headerTitle: "联系我们",
        headerSubtitle: "我们很乐意听取您的意见。无论您有问题、反馈还是合作想法，随时与我们联系。",
        breadcrumbHome: "首页",
        breadcrumbContact: "联系",
        touchTitle: "联系方式",
        touchText: "通过电子邮件联系我们是最好的方式。我们通常在1–2个工作日内回复。",
        touchText2: "请尽可能包含详细信息，以便我们快速为您提供帮助。",
        helpTitle: "我们能帮您什么？",
        topic1Title: "计算器反馈",
        topic1Desc: "发现问题或想要新功能？告诉我们，我们会处理。",
        topic2Title: "错误报告",
        topic2Desc: "计算结果有问题？请告诉我们详细信息。",
        topic3Title: "建议",
        topic3Desc: "有新计算器或改进的想法？我们洗耳恭听。",
        topic4Title: "合作伙伴",
        topic4Desc: "有兴趣合作或广告？请发送消息给我们。",
        faqTitle: "常见问题",
        faq1Q: "您的计算器是免费的吗？",
        faq1A: "是的 — 所有Calculator Tap工具完全免费，无需注册。",
        faq2Q: "您会存储我的财务数据吗？",
        faq2A: "不会。所有计算都在您的浏览器中进行。我们从不存储、收集或共享您的财务数据。",
        faq3Q: "我可以申请新的计算器吗？",
        faq3A: "当然可以。通过上面的电子邮件给我们发送消息，我们将在未来的更新中考虑。"
      }
    }
  },
  ja: {
    footer: {
      privacyPolicy: "プライバシーポリシー",
      terms: "利用規約",
      about: "について",
      contact: "お問い合わせ",
      sitemap: "サイトマップ"
    },
    sidebar: {
      otherCalculators: "他の計算機"
    },
    pages: {
      contact: {
        headerTitle: "お問い合わせ",
        headerSubtitle: "ご質問、フィードバック、またはパートナーシップのアイデアがあれば、いつでもご連絡ください。",
        breadcrumbHome: "ホーム",
        breadcrumbContact: "お問い合わせ",
        touchTitle: "お問い合わせ方法",
        touchText: "メールでのお問い合わせが最善の方法です。通常1〜2営業日以内にご回答します。",
        touchText2: "迅速にご対応するため、できるだけ詳細な情報をお含めください。",
        helpTitle: "何かお手伝いできることはありますか？",
        topic1Title: "計算機のフィードバック",
        topic1Desc: "問題を見つけたり、新機能を希望する場合はお知らせください。",
        topic2Title: "バグ報告",
        topic2Desc: "計算結果に問題がありますか？詳細をお知らせください。",
        topic3Title: "提案",
        topic3Desc: "新しい計算機や改善のアイデアがありますか？ぜひお聞かせください。",
        topic4Title: "パートナーシップ",
        topic4Desc: "コラボレーションや広告に興味がありますか？メッセージを送ってください。",
        faqTitle: "よくある質問",
        faq1Q: "計算機は無料ですか？",
        faq1A: "はい — すべてのCalculator Tapツールは、登録不要で完全無料です。",
        faq2Q: "財務データを保存しますか？",
        faq2A: "いいえ。すべての計算はブラウザ内で行われます。財務データの保存、収集、共有は一切行いません。",
        faq3Q: "新しい計算機をリクエストできますか？",
        faq3A: "もちろんです。上記のメールアドレスにメッセージを送ってください。将来のアップデートで検討します。"
      }
    }
  }
};

const langs = ['en', 'es', 'zh', 'ko', 'ja'];

langs.forEach(lang => {
  const filePath = path.join(__dirname, 'i18n', `${lang}.json`);
  const existing = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const additions = newKeys[lang];

  // Add footer
  if (!existing.footer) {
    existing.footer = additions.footer;
  }

  // Add sidebar
  if (!existing.sidebar) {
    existing.sidebar = additions.sidebar;
  }

  // Add pages.contact
  if (!existing.pages) existing.pages = {};
  if (!existing.pages.contact) {
    existing.pages.contact = additions.pages.contact;
  }

  // Fix email addresses
  const jsonStr = JSON.stringify(existing, null, 2)
    .replace(/yourtap1000@gmail\.com/g, 'jakehan60@gmail.com');

  fs.writeFileSync(filePath, jsonStr + '\n', 'utf8');
  console.log(`✓ Updated i18n/${lang}.json`);
});

console.log('\nDone!');
