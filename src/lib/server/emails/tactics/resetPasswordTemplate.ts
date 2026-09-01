/**
 * Concrete Strategies for the various kinds of emails
 **/
import {
    EmailStrategyContext,
    type FormatEmailStrategy,
} from '../emailStrategiesContext';
//
interface PasswordEmail {
    link: string;
}
//
class ResetPasswordStrategy implements FormatEmailStrategy<PasswordEmail> {
    format(data: PasswordEmail): string {
        const template = `http://localhost:5173${data.link}`;
        return template;
    }
}
//
export const resetPasswordEmail = new EmailStrategyContext<PasswordEmail>(
    new ResetPasswordStrategy(),
);
//
