import {describe, expect, test} from '@jest/globals'

import {mergeEnvVars} from '../src/helpers/env.helper'

describe('Inputs', () => {
  test('should correctly merge a single env var', async () => {
    const existingEnvVars = [
      {
        envVar: {key: 'SENTRY_RELEASE', value: '1.2.3.4'},
        cursor: 'abc123'
      }
    ]

    const updatedEnvVars = {FOO: 'bar'}

    expect(mergeEnvVars(existingEnvVars, updatedEnvVars)).toEqual([
      {
        key: 'SENTRY_RELEASE',
        value: '1.2.3.4'
      },
      {
        key: 'FOO',
        value: 'bar'
      }
    ])
  })

  test('should correctly merge multiple env vars', async () => {
    const existingEnvVars = [
      {
        envVar: {key: 'SENTRY_RELEASE', value: '1.2.3.4'},
        cursor: 'abc123'
      }
    ]

    const updatedEnvVars = {
      FOO: 'bar',
      BAR: 'baz'
    }

    expect(mergeEnvVars(existingEnvVars, updatedEnvVars)).toEqual([
      {
        key: 'SENTRY_RELEASE',
        value: '1.2.3.4'
      },
      {
        key: 'FOO',
        value: 'bar'
      },
      {
        key: 'BAR',
        value: 'baz'
      }
    ])
  })

  test('should correctly update value of existing env var', async () => {
    const existingEnvVars = [
      {
        envVar: {key: 'SENTRY_RELEASE', value: '1.2.3.4'},
        cursor: 'abc123'
      }
    ]

    const updatedEnvVars = {
      SENTRY_RELEASE: '1.2.3.5'
    }

    expect(mergeEnvVars(existingEnvVars, updatedEnvVars)).toEqual([
      {
        key: 'SENTRY_RELEASE',
        value: '1.2.3.5'
      }
    ])
  })

  test('should correctly update value of existing env var with other vars preserved', async () => {
    const existingEnvVars = [
      {
        envVar: {key: 'SENTRY_RELEASE', value: '1.2.3.4'},
        cursor: 'abc123'
      },
      {
        envVar: {key: 'FOO', value: 'bar'},
        cursor: 'abc123'
      }
    ]

    const updatedEnvVars = {
      SENTRY_RELEASE: '1.2.3.5',
      BAR: 'baz'
    }

    expect(mergeEnvVars(existingEnvVars, updatedEnvVars)).toEqual([
      {
        key: 'SENTRY_RELEASE',
        value: '1.2.3.5'
      },
      {
        key: 'FOO',
        value: 'bar'
      },
      {
        key: 'BAR',
        value: 'baz'
      }
    ])
  })
})
