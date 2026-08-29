/**
 *
 **/
const EmailStrategyContext = function () {
    this.styling = ``;
    this.setStrategy = (styling) => {
        this.styling = styling;
    };
    this.finalTemplate = (campaignData) => {
        return this.styling.finalTemplate(campaignData);
    };
};

const emailStrategyContext = new EmailStrategyContext();
