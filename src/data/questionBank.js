// Unified MathBridge question-bank registry.
// Each school level keeps its own curriculum-aligned question bank.
import {primary1Questions} from './primary1Math';
import {primary2Questions} from './primary2Math';
import {primary3Questions} from './primary3Math';
import {primary4Questions} from './primary4Math';
import {primary5Questions} from './primary5Math';
import {primary6Questions} from './primary6Math';
import {jss1Questions} from './jss1Math';
import {jss2Questions} from './jss2Math';
import {jss3Questions} from './jss3Math';

export const classQuestionBanks={P1:primary1Questions,P2:primary2Questions,P3:primary3Questions,P4:primary4Questions,P5:primary5Questions,P6:primary6Questions,JSS1:jss1Questions,JSS2:jss2Questions,JSS3:jss3Questions};
export const getQuestionsForLevel=level=>classQuestionBanks[level]||[];
