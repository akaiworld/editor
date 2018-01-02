import { Lang as LangClass } from './helpers/fns.js';

const texts = {
	'page': {
		en: 'Page',
		ru: 'Страница',
	},
	'block': {
		en: 'Block',
		ru: 'Блок',
	},
	'text-element': {
		en: 'Text',
		ru: 'Текст',
	},
	'image-element': {
		en: 'Image',
		ru: 'Картинка',
	},
	'image-with-text-element': {
		en: 'Image with text',
		ru: 'Картинка с текстом',
	},
	'use-element-on': {
		en: 'This element is enabled',
		ru: 'Этот элемент активен',
	},
	'use-element-off': {
		en: 'This element is disabled',
		ru: 'Этот элемент не активен',
	},
	'color-value': {
		en: 'Color',
		ru: 'Цвет',
	},
	'text-options': {
		en: 'Some text options',
		ru: 'Настройки текста',
	},
	'image-uploader-drop': {
		en: 'Drop image here to upload',
		ru: 'Перенесите изображение сюда для загрузки',
	},
	'image-uploader-start': {
		en: 'Uploading...',
		ru: 'Загрузка...',
	},
	'image-url': {
		en: 'Image URL',
		ru: 'URL изображения',
	},
	'block-id': {
		en: 'Block ID',
		ru: 'Ай-ди блока',
	},
	'option-1': {
		en: 'Option 1',
		ru: 'Опция 1',
	},
	'option-2': {
		en: 'Option 2',
		ru: 'Опция 2',
	},
	'option-3': {
		en: 'Option 3',
		ru: 'Опция 3',
	},
	'text-color': {
		en: 'Text color',
		ru: 'Цвет текста',
	},
	'add-list-element': {
		en: 'Add element',
		ru: 'Добавить элемент',
	},
}

export const Lang = new LangClass( texts, 'en' );