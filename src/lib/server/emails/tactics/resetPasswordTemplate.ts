/**
 *
 **/
const ResetPassword = function () {
    this.finalTemplate = (campaignData) => {
        const template = `${campaignData.link}`;
        return template;
    };
};
//
export const resetPasswordEmail = new ResetPassword();
//
