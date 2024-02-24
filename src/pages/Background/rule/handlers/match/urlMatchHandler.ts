import logger from ".../utils/logger"

/**
 * 判断当前 URL 是否匹配
 * @returns true:匹配； false:不匹配； undefined:没有 URL 匹配规则
 */
export default async function checkCurrentUrlMatch(
  tabInfo: chrome.tabs.Tab | null,
  rule: ruleV2.IRuleConfig
): Promise<boolean | undefined> {
  const trigger = rule.match?.triggers?.find((t) => t.trigger === "urlTrigger")

  if (!trigger) {
    return undefined
  }

  if (!tabInfo) {
    return false
  }

  const currentUrl = tabInfo.url
  if (!currentUrl) {
    return false
  }

  const config = trigger.config as ruleV2.IUrlTriggerConfig
  if (!config) {
    return false
  }

  return isMatchUrl(currentUrl, config.matchUrl, config.matchMethod, config.useFullUrl ?? false)
}

/**
 * 所有 tab 中，只要有一个匹配，就会返回匹配的 tab，否则返回 null
 */
export async function checkAnyUrlMatch(
  tabs: chrome.tabs.Tab[] | undefined,
  rule: ruleV2.IRuleConfig
): Promise<chrome.tabs.Tab | null> {
  const trigger = rule.match?.triggers?.find((t) => t.trigger === "urlTrigger")

  if (!trigger) {
    return null
  }

  if (!tabs || tabs.length === 0) {
    return null
  }

  for (const tab of tabs) {
    const matchOne = await checkCurrentUrlMatch(tab, rule)
    if (matchOne) {
      return tab
    }
  }
  return null
}

function isMatchUrl(
  url: string | undefined,
  patterns: string[] | undefined,
  matchMethod: ruleV2.MatchMethod,
  useFullUrl: boolean
): boolean {
  if (!url || url === "") return false
  if (!patterns || patterns.length === 0) return false

  let matchUrl = url
  if (!useFullUrl) {
    const index1 = url.indexOf("?")
    if (index1 > 0) {
      matchUrl = matchUrl.substring(0, index1)
    }
    const index2 = matchUrl.indexOf("#")
    if (index2 > 0) {
      matchUrl = matchUrl.substring(0, index2)
    }
  }

  if (matchMethod === "wildcard") {
    const exist = patterns.find((pattern) => isMatchByWildcard(matchUrl, pattern))
    return Boolean(exist)
  } else if (matchMethod === "regex") {
    const exist = patterns.find((pattern) => isMatchByRegex(matchUrl, pattern))
    return Boolean(exist)
  }

  return false
}

function isMatchByWildcard(text: string, pattern: string) {
  if (!pattern.startsWith("*")) {
    pattern = `*${pattern}`
  }
  if (!pattern.endsWith("*")) {
    pattern = `${pattern}*`
  }

  // [LeetCode44.通配符匹配 JavaScript - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000019486910 )
  let dp = []
  for (let i = 0; i <= text.length; i++) {
    let child = []
    for (let j = 0; j <= pattern.length; j++) {
      child.push(false)
    }
    dp.push(child)
  }
  dp[text.length][pattern.length] = true
  for (let i = pattern.length - 1; i >= 0; i--) {
    if (pattern[i] !== "*") break
    else dp[text.length][i] = true
  }

  for (let i = text.length - 1; i >= 0; i--) {
    for (let j = pattern.length - 1; j >= 0; j--) {
      if (text[i] === pattern[j] || pattern[j] === "?") {
        dp[i][j] = dp[i + 1][j + 1]
      } else if (pattern[j] === "*") {
        dp[i][j] = dp[i + 1][j] || dp[i][j + 1]
      } else {
        dp[i][j] = false
      }
    }
  }
  return dp[0][0]
}

function isMatchByRegex(text: string, pattern: string) {
  const regex = new RegExp(pattern, "i")
  return regex.test(text)
}
