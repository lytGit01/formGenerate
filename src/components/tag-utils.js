import {noop} from 'element-ui/src/utils/util';
import AsyncValidator from 'async-validator';

// 重写form-item的validate
export const rewrite_el_form_validate = (that, refName, targetValueName) => {
  let formItemRef = that.$refs[refName];
  if (formItemRef) {
    formItemRef.validate = (trigger, callback = noop) => {
      // 这里需要提前同步form.model[prop]对应的赋值
      formItemRef.form.model[formItemRef.prop] = that[targetValueName];
      formItemRef.validateDisabled = false;
      const rules = formItemRef.getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && formItemRef.required === undefined) {
        callback();
        return true;
      }
      formItemRef.validateState = 'validating';
      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger;
        });
      }
      descriptor[formItemRef.prop] = rules;
      const validator = new AsyncValidator(descriptor);
      const model = {};

      model[formItemRef.prop] = that[targetValueName];
      validator.validate(model, {firstFields: true}, (errors, invalidFields) => {
        formItemRef.validateState = !errors ? 'success' : 'error';
        formItemRef.validateMessage = errors ? errors[0].message : '';

        callback(formItemRef.validateMessage, invalidFields);
        formItemRef.elForm && formItemRef.elForm.$emit('validate', formItemRef.prop,
          !errors, formItemRef.validateMessage || null);
        console.log('1111',
          targetValueName,
          that[targetValueName],
          formItemRef.getFilteredRule(trigger),
          errors,
          invalidFields,
          model,
          that);
      });
    };
  }
};

/**
 * 针对校验值为数组的特殊校验处理
 * @param that
 * @param refName
 * @param targetValue
 */
export const rewrite_el_form_array_validate = (that, refName, targetValue) => {
  let formItemRef = that.$refs[refName];
  if (formItemRef) {
    formItemRef.validate = (trigger, callback = noop) => {
      // 这里需要提前同步form.model[prop]对应的赋值
      formItemRef.form.model[formItemRef.prop] = targetValue;
      formItemRef.validateDisabled = false;
      const rules = formItemRef.getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && formItemRef.required === undefined) {
        callback();
        return true;
      }
      formItemRef.validateState = 'validating';
      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger;
        });
      }
      descriptor[formItemRef.prop] = rules;
      const validator = new AsyncValidator(descriptor);
      const model = {};

      model[formItemRef.prop] = targetValue;
      validator.validate(model, {firstFields: true}, (errors, invalidFields) => {
        formItemRef.validateState = !errors ? 'success' : 'error';
        formItemRef.validateMessage = errors ? errors[0].message : '';

        callback(formItemRef.validateMessage, invalidFields);
        formItemRef.elForm && formItemRef.elForm.$emit('validate', formItemRef.prop,
          !errors, formItemRef.validateMessage || null);
        console.log('1111',
          targetValue,
          formItemRef.getFilteredRule(trigger),
          errors,
          invalidFields,
          model,
          that);
      });
    };
  }
};

/**
 * TODO
 * 针对datePicker等多个选择器，值类型为数组中某个元素的key的校验
 * @param that
 * @param refName
 * @param targetValue | {array}
 */
export const rewrite_el_form_pickers_validate = (that, refName, targetValue) => {
  let formItemRef = that.$refs[refName];
  if (formItemRef) {
    formItemRef.validate = (trigger, callback = noop) => {
      // 这里需要提前同步form.model[prop]对应的赋值
      formItemRef.form.model[formItemRef.prop] = targetValue;
      formItemRef.validateDisabled = false;
      const rules = formItemRef.getFilteredRule(trigger);
      if ((!rules || rules.length === 0) && formItemRef.required === undefined) {
        callback();
        return true;
      }
      formItemRef.validateState = 'validating';
      const descriptor = {};
      if (rules && rules.length > 0) {
        rules.forEach(rule => {
          delete rule.trigger;
        });
      }
      descriptor[formItemRef.prop] = rules;
      const validator = new AsyncValidator(descriptor);
      const model = {};

      model[formItemRef.prop] = targetValue;
      validator.validate(model, {firstFields: true}, (errors, invalidFields) => {
        formItemRef.validateState = !errors ? 'success' : 'error';
        formItemRef.validateMessage = errors ? errors[0].message : '';

        callback(formItemRef.validateMessage, invalidFields);
        formItemRef.elForm && formItemRef.elForm.$emit('validate', formItemRef.prop,
          !errors, formItemRef.validateMessage || null);
        console.log('rewrite_el_form_pickers_validate',
          targetValue,
          formItemRef.getFilteredRule(trigger),
          errors,
          invalidFields,
          model,
          that);
      });
    };
  }
};
