import * as chai from 'chai';
import { chaiPromised } from '../src/chai-promised';

chai.should();
chai.use(chaiPromised);

import './assert-eventually'
import './assert-promise-specific'
import './should-eventually'
import './should-promise-specific'
import './chainable-methods-compat'
import './configurable-asserter-args'
import './configurable-promiseness-transfer'
import './custom-messages'
import './proxy-guard'
