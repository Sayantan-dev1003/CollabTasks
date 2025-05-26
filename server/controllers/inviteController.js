import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const sendInvite = async (req, res) => {
  const { adminName, email, role, organization, organizationId } = req.body;

  if (!email || !role || !organization) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // 1. Generate a token valid for 3 days
    const token = jwt.sign(
      { email, role, organization, organizationId },
      process.env.JWT_SECRET,
      { expiresIn: '3d' }
    );

    // 2. Generate invite link
    const inviteLink = `http://localhost:5173/register?token=${token}`;

    // 3. Configure mail transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Email content
    const mailOptions = {
      from: `${adminName}`,
      to: email,
      subject: 'You are invited!',
      html: `<p>Hello,</p>
        <p>You have been invited to join ${organization} as a ${role}.</p>
        <p>Click below to accept the invitation:</p>
        <a href="${inviteLink}">Accept Invitation</a>
        <p>This link expires in 3 days.</p>`,
    };

    // 5. Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Invitation sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send invitation' });
  }
};

export { sendInvite };