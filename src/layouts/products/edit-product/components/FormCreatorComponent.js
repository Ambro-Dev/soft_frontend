/* eslint-disable dot-notation */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { SurveyCreator, SurveyCreatorComponent } from "survey-creator-react";
import "survey-core/survey.i18n";
import "survey-creator-core/survey-creator-core.i18n";
import PropTypes from "prop-types";
import { localization, editorLocalization } from "survey-creator-core";
import { surveyLocalization } from "survey-core";
import "survey-core/defaultV2.css";
import "survey-creator-core/survey-creator-core.css";
import "./polishCreator";

function FormCreatorRenderComponent({ saveSurvey, surveyJSON }) {
  localization.currentLocale = "en";
  editorLocalization.defaultLocale = "en";
  surveyLocalization.defaultLocale = "en";
  const options = {
    haveCommercialLicense: true,
    showState: true,
    isAutoSave: true,
    showTranslationTab: true,
  };
  const creator = new SurveyCreator(options);
  // Move the Others category to the end
  const { categories } = creator.toolbox;
  const othersIndex = categories.findIndex((category) => category.name === "Inne");
  const othersCategory = categories.splice(othersIndex, 1)[0];
  categories.push(othersCategory);
  creator.JSON = surveyJSON;
  creator.locale = "en";

  surveyLocalization.supportedLocales = ["pl", "en"];

  creator.toolbox.allowExpandMultipleCategories = true;
  creator.showSidebar = false;
  creator.toolbox.forceCompact = false;

  // Set the saveSurvey function as the saveSurvey property of the SurveyCreator
  creator.saveSurveyFunc = (saveNo, callback) => {
    saveSurvey(creator, saveNo, callback);
  };

  return <SurveyCreatorComponent creator={creator} />;
}

FormCreatorRenderComponent.propTypes = {
  saveSurvey: PropTypes.func.isRequired,
};

export default FormCreatorRenderComponent;
