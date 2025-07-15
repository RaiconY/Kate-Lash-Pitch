// Configuration and constants for Lash Studio Pattaya pitch deck
const CONFIG = {
    // Project metadata
    project: {
        name: 'Lash Studio Pattaya',
        version: '2.0.0',
        description: 'Investment pitch deck for lash studio in Pattaya',
        author: 'Ekaterina Sokolova',
        location: 'Pattaya, Thailand',
        lastUpdated: 'July 2025'
    },

    // Business metrics
    metrics: {
        monthlyRevenue: '120k ฿',
        monthlyProfit: '50k ฿',
        averageCheck: '2000 ฿',
        margin: '42%',
        clientRetention: '65%',
        competitors: '0',
        experience: '6 лет',
        trainedMasters: '100+'
    },

    // Investment details
    investment: {
        amount: '900k ฿',
        currency: 'THB',
        paybackPeriod: '21 месяц',
        investorShare: '25%',
        permanentShare: '20%',
        annualReturn: '~40%',
        annualIncome: '360k ฿'
    },

    // Contact information
    contact: {
        whatsapp: '+66123456789', // Update with real number
        telegram: '@your_telegram_username', // Update with real username
        phone: '+66123456789', // Update with real number
        email: 'kate@lashstudio-pattaya.com', // Update with real email
        location: 'Pattaya, Thailand'
    },

    // Color scheme
    colors: {
        primary: '#d4b39f',
        secondary: '#e0c2ad',
        text: '#2d2926',
        background: '#fdfcfb',
        backgroundAlt: '#faf6f2'
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}