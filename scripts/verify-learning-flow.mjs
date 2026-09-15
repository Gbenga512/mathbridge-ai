import {strict as assert} from 'node:assert';
import {nextUnmasteredTopic,shouldContinueLearning} from '../src/learningFlow.js';

assert.equal(nextUnmasteredTopic(['Numbers','Algebra','Geometry'],[]),'Numbers');
assert.equal(nextUnmasteredTopic(['Numbers','Algebra','Geometry'],['Numbers']),'Algebra');
assert.equal(nextUnmasteredTopic(['Numbers','Algebra','Geometry'],['Numbers','Algebra']),'Geometry');
assert.equal(nextUnmasteredTopic(['Numbers'],['Numbers']),'');
assert.equal(shouldContinueLearning({term:'T1',week:2,masteredWeeks:['T1-1']}),true);
assert.equal(shouldContinueLearning({term:'T1',week:1,masteredWeeks:[]}),false);
console.log('Learning flow QA passed.');
