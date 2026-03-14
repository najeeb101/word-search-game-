/**
 * Word definitions keyed by normalized form (uppercase, no spaces).
 */
const DEFINITIONS = {
    PMDD: {
        display: 'PMDD',
        definition: 'PMDD is like PMS turned up to an extreme level. People experience severe depression, anxiety, rage, or emotional chaos before their period, then feel much better once it starts. It\'s a clinically recognised condition — not weakness or overreacting.',
    },
    AGENCY: {
        display: 'Agency',
        definition: 'The ability to act independently and make meaningful choices. For women, it means being seen as active decision-makers in their own lives, not passive recipients of decisions made by others.',
    },
    EQUITY: {
        display: 'Equity',
        definition: 'Fairness, not sameness. Equity recognises that women may need different resources or support to reach equal outcomes, and focuses on removing structural barriers rather than expecting everyone to adapt to unequal systems.',
    },
    PINKTAX: {
        display: 'Pink Tax',
        definition: 'The higher prices women often pay for everyday products simply because they are marketed "for women." This hidden cost adds up over a lifetime and shows how inequality can be subtle and built into daily life.',
    },
    ALLYSHIP: {
        display: 'Allyship',
        definition: 'The practice of actively supporting women by listening, learning, and using your position to challenge inequality. True allyship is about action, not just words.',
    },
    TOKENISM: {
        display: 'Tokenism',
        definition: 'When organisations include just a few women to create the image of diversity, without sharing real power or opportunities. The "token" person is put on display but may be ignored in actual decisions.',
    },
    ADVOCACY: {
        display: 'Advocacy',
        definition: 'The act of speaking up and pushing for change — fighting for rights, better healthcare, safety, and policies that reflect women\'s real lived experiences.',
    },
    EQUALITY: {
        display: 'Equality',
        definition: 'Equality means everyone receives the same treatment and opportunities regardless of gender. For women, it means equal pay, equal access to education and leadership, and freedom from discrimination — not just in law, but in everyday life.',
    },
    MOMGUILT: {
        display: 'Mom Guilt',
        definition: 'The constant feeling of falling short, whether at work, at home, or with oneself. It reflects the unrealistic expectation that mothers must be endlessly present, productive, and selfless.',
    },
    GLASSCLIFF: {
        display: 'Glass Cliff',
        definition: 'Women are often promoted into high-profile roles exactly when things are already going wrong. If the situation collapses, they get blamed — reinforcing stereotypes about women\'s leadership, even though the situation was already failing.',
    },
    SPONSORSHIP: {
        display: 'Sponsorship',
        definition: 'When someone in a position of power actively speaks up for a woman, recommends her for opportunities, and helps open doors. Unlike mentorship, a sponsor uses their influence to act on your behalf.',
    },
    MISCARRIAGE: {
        display: 'Miscarriage',
        definition: 'The loss of a pregnancy before the baby can survive. Beyond the physical experience, it carries deep grief that is often suffered in silence. It is far more common than most people realise.',
    },
    MANTERRUPTION: {
        display: 'Manterruption',
        definition: 'The pattern where women are interrupted more often than men, especially in meetings. Interruptions reduce influence and send the message that her contribution is less important.',
    },
    ENDOMETRIOSIS: {
        display: 'Endometriosis',
        definition: 'A chronic condition where tissue similar to the uterine lining grows outside the uterus, causing severe pain, fatigue, and sometimes fertility challenges. It is often misunderstood or diagnosed very late.',
    },
    OSTEOPOROSIS: {
        display: 'Osteoporosis',
        definition: 'A condition that makes bones weaker and more fragile over time. It affects women disproportionately — especially after menopause — yet is often underestimated or caught too late.',
    },
    INTERSECTIONALITY: {
        display: 'Intersectionality',
        definition: 'Gender doesn\'t act alone — it interacts with race, class, disability, sexuality, and more. A woman of colour may face both sexism and racism at once, creating combined barriers that require their own understanding and solutions.',
    },
    DOUBLEBIND: {
        display: 'Double Bind',
        definition: 'The leadership trap where women lose no matter what. Be assertive and she\'s "aggressive." Be warm and she\'s "not leadership material." Men doing the same get praised; women get penalised.',
    },
    MICROAGGRESSION: {
        display: 'Microaggression',
        definition: 'Subtle comments or behaviours that communicate bias — sometimes disguised as jokes. Examples: "you\'re surprisingly smart," or ignoring a woman\'s idea until a man repeats it. Each one seems minor, but they add up.',
    },
    HYPERANDROGENISM: {
        display: 'Hyperandrogenism',
        definition: 'Having higher-than-usual levels of androgens, which can cause acne, excess hair growth, hair thinning, and irregular periods. It\'s a medical condition — not a personal failure — often linked to PCOS.',
    },
    MEDICALGASLIGHTING: {
        display: 'Medical Gaslighting',
        definition: 'When doctors dismiss real symptoms as "stress" or "just hormones." Women are especially affected, leading to delayed diagnoses and patients who start doubting their own reality.',
    },
    FERTILITYJOURNEY: {
        display: 'Fertility Journey',
        definition: 'The emotional, physical, and medical path of trying to conceive. It often involves intense pressure, invasive treatments, and deep uncertainty. Outcomes don\'t define a person\'s worth.',
    },
    POSTNALANXIETY: {
        display: 'Postnatal Anxiety',
        definition: 'Intense worry or fear after giving birth. Mothers may feel constantly on edge, afraid something will go wrong. Because anxiety is less visible than depression, it is often overlooked despite being equally impactful.',
    },
    POSTNATALANXIETY: {
        display: 'Postnatal Anxiety',
        definition: 'Intense worry or fear after giving birth. Mothers may feel constantly on edge, afraid something will go wrong. Because anxiety is less visible than depression, it is often overlooked despite being equally impactful.',
    },
    PATERNALLEAVE: {
        display: 'Paternal Leave',
        definition: 'Time granted to parents to care for a newborn. When limited or unequal, women carry the greatest burden. Fair parental leave protects mental health and helps reduce gender inequality at work and at home.',
    },
    IMPOSTORSYNDROME: {
        display: 'Impostor Syndrome',
        definition: 'The feeling of not being good enough, even when evidence proves otherwise. Many women experience this in spaces where they are underrepresented or judged more harshly. It\'s a response to unequal systems, not a personal flaw.',
    },
    EMPOWERMENT: {
        display: 'Empowerment',
        definition: 'Gaining the confidence, skills, and resources to take control of your own life — having real access to opportunities, education, decision-making, and freedom from discrimination.',
    },
};

/**
 * Returns the definition for a normalized word key (uppercase, no spaces).
 * @param {string} normalizedWord
 * @returns {{ display: string, definition: string } | null}
 */
export function getDefinition(normalizedWord) {
    return DEFINITIONS[normalizedWord] || null;
}
