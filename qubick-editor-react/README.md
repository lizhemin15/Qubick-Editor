# Qubick Editor React

这是 Qubick Editor 的 React 重构版本，使用 TypeScript 进行开发。

## 技术栈

- React 18
- TypeScript
- Font Awesome
- React Beautiful DND

## 开发环境设置

1. 克隆仓库
2. 运行安装脚本：
   ```bash
   ./install.bat
   ```
3. 启动开发服务器：
   ```bash
   npm start
   ```

## 项目结构

```
qubick-editor-react/
├── src/
│   ├── components/       # React 组件
│   ├── styles/          # CSS 样式文件
│   ├── types/           # TypeScript 类型定义
│   ├── utils/           # 工具函数
│   ├── App.tsx          # 主应用组件
│   └── index.tsx        # 应用入口
├── public/              # 静态资源
└── package.json         # 项目配置
```

## 主要功能

- 左侧边栏模块管理
- 动作模块编辑
- 子程序管理
- 拖拽排序

## 开发指南

1. 组件开发
   - 所有组件都使用 TypeScript
   - 使用函数组件和 Hooks
   - 保持组件的单一职责

2. 样式管理
   - 使用模块化 CSS
   - 遵循 BEM 命名规范

3. 状态管理
   - 使用 React Context 进行状态管理
   - 复杂状态考虑使用 Redux

## 贡献指南

1. Fork 项目
2. 创建特性分支
3. 提交变更
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT
