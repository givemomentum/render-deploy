export interface EnvVar {
  key: string
  value: string
}

export interface EnvVarResponse {
  envVar: EnvVar
}

export function mergeEnvVars(
  existingVars: EnvVarResponse[],
  updatedVars: Record<string, string>
): EnvVar[] {
  const existingVarsMap = new Map(
    existingVars.map((item: EnvVarResponse) => [
      item.envVar.key,
      item.envVar.value
    ])
  )

  for (const [key, value] of Object.entries(updatedVars)) {
    existingVarsMap.set(key, value)
  }

  return Array.from(existingVarsMap).map(([key, value]) => ({
    key,
    value
  }))
}
