
// This service handles email sending using the Resend API
// NOTE: In a production environment, you should route this through a backend proxy
// to avoid exposing your API key. For this demo/prototype, we are calling directly.

const RESEND_API_KEY = process.env.RESEND_API_KEY || 're_123456789'; // Should be replaced by user env
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'contact@example.com';

export const sendFeedbackEmail = async (lessonId: string, feedback: string, userEmail?: string) => {
  if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY is not set. Simulating email send.");
      return new Promise(resolve => setTimeout(resolve, 1000));
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'CodeFix Feedback <onboarding@resend.dev>', // Use the default Resend testing domain or your verified domain
        to: [process.env.CONTACT_EMAIL],
        subject: `New Dislike Feedback: Lesson ${lessonId}`,
        html: `
          <h1>New Feedback Received</h1>
          <p><strong>Lesson ID:</strong> ${lessonId}</p>
          <p><strong>User:</strong> ${userEmail || 'Anonymous'}</p>
          <hr />
          <h3>Reason:</h3>
          <p>${feedback}</p>
        `
      })
    });

    if (!response.ok) {
        throw new Error('Failed to send email');
    }
    
    return await response.json();
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const sendContactEmail = async (name: string, email: string, subject: string, message: string) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is not set. Simulating contact email send.");
        return new Promise(resolve => setTimeout(resolve, 1500));
    }

    try {
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`
            },
            body: JSON.stringify({
                from: 'CodeFix Contact <onboarding@resend.dev>',
                to: [process.env.CONTACT_EMAIL],
                reply_to: email,
                subject: `Contact Form: ${subject}`,
                html: `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          `
            })
        });

        if (!response.ok) {
            throw new Error('Failed to send email');
        }

        return await response.json();
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
