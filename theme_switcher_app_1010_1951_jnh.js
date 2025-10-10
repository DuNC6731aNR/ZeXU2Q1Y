// 代码生成时间: 2025-10-10 19:51:30
const { NextApiRequest, NextApiResponse } = require('next')

// 定义主题名称
const Theme = {
  LIGHT: 'light',
  DARK: 'dark'
}

// 从请求中获取主题
const getTheme = (req) => {
  const cookieTheme = req.cookies.theme
  return cookieTheme || Theme.LIGHT
}

// 设置主题到响应的cookie
const setTheme = (res, theme) => {
  res.cookie('theme', theme, {
    path: '/',
    maxAge: 365 * 24 * 60 * 60 * 1000, // 1 year
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict'
  })
}

// 主题切换API
const themeSwitcherApi = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { theme } = req.body
      if (theme !== Theme.LIGHT && theme !== Theme.DARK) {
        throw new Error('Invalid theme')
      }
      setTheme(res, theme)
      res.status(200).json({ message: 'Theme switched successfully' })
    } catch (error) {
      // 错误处理
      res.status(400).json({ error: error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end('Method Not Allowed')
  }
}

module.exports = themeSwitcherApi
