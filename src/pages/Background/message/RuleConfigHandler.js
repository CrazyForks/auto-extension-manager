import { OptionsStorage } from ".../storage"
import createRuleHandler from "../rule/RuleHandler"

/**
 * rule 配置发生变化时触发
 */
export const onRuleConfigChanged = (ctx) => {
  OptionsStorage.getAll().then((options) => {
    const handler = createRuleHandler()
    handler.setRules(options.ruleConfig)
  })

  ctx.sendResponse()
}
