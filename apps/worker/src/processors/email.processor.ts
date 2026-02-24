import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Processor('email-send')
export class EmailProcessor extends WorkerHost {
    private readonly logger = new Logger(EmailProcessor.name);

    constructor(private readonly prisma: PrismaService) {
        super();
    }

    async process(job: Job<any, any, string>): Promise<any> {
        this.logger.log(`Processing email job ${job.id} for ${job.data.to}`);

        const { to, subject, body, campaignId, contactId } = job.data;

        try {
            // Placeholder for real email provider integration (Resend/SendGrid)
            // In a real scenario, you'd use a dedicated EmailService in @ori-os/core
            this.logger.log(`Simulating email delivery to ${to}...`);
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate work

            // Update DB if related to a campaign/contact
            if (campaignId && contactId) {
                await this.prisma.campaignContact.update({
                    where: {
                        campaignId_contactId: {
                            campaignId,
                            contactId
                        }
                    },
                    data: {
                        status: 'sent',
                        sentAt: new Date()
                    }
                });

                await this.prisma.activity.create({
                    data: {
                        organizationId: job.data.organizationId,
                        contactId,
                        type: 'email_sent',
                        title: subject,
                        occurredAt: new Date()
                    }
                });
            }

            this.logger.log(`Email job ${job.id} completed successfully`);
            return { success: true };
        } catch (error) {
            this.logger.error(`Failed to process email job ${job.id}: ${error.message}`);
            throw error;
        }
    }
}
