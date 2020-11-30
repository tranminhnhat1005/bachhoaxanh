/**@jsx jsx */
import { css, jsx } from '@emotion/core';
import React, { useEffect } from 'react';
import { randomString } from '../../../utils';
import Button from '../../button/button';
import ButtonOption from '../../button/more-options';
import {
	BackgroundColor,
	Bold,
	Bullets,
	Decrease,
	Emoji,
	FontFamily,
	FontSize,
	Hyperlink,
	Increase,
	Italic,
	Numbering,
	Picture,
	Undo,
	TextAlignCenter,
	TextAlignJustify,
	TextAlignLeft,
	TextAlignRight,
	TextColor,
	Underline,
	Redo,
} from '../../icons/general';
import Attach from '../../icons/button/attach/attach';

const Id = randomString(7, { allowSymbol: false, allowNumber: false });
const getElById = (id) => {
	return document.getElementById(id);
};
const IDs = {
	container: `${Id}-text-editor-container`,
	label: `${Id}-text-editor-label`,
	main: `${Id}-text-editor-main`,
	output: `${Id}-text-editor-output`,
	toolbar: `${Id}-text-editor-toolbar`,
};

const TextEditor = (props) => {
	const { label = 'Soạn thảo văn bản' } = props;
	const Container = css`
		* {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}
		font-family: sans-serif;
		height: 100%;
		width: 100%;
	`;
	const LabelContainer = css`
		height: auto;
		padding: 5px 0 12px;
		width: 100%;
	`;
	const LabelContent = css`
		font-size: 12px;
		font-weight: 700;
		height: 14px;
		line-height: 14px;
		width: 100%;
	`;
	const Main = css`
		background-color: #ffffff;
		border: 1px solid #7f828e;
		border-radius: 4px;
		height: 100%;
		min-height: 330px;
		min-width: 548px;
		padding: 24px;
		position: relative;
		resize: both;
		overflow: hidden;
		width: 100%;
	`;
	const Output = css`
		border: 0;
		height: 100%;
		min-height: 200px;
		outline: none;
		width: 100%;
		/* body {
			width: 100%;
			word-break: break-all;
			overflow: auto;
			height: 100%;
			display: block;
		} */
	`;
	const Toolbar = css`
		background-color: #fff;
		box-shadow: 0 4px 5px 0 rgba(0, 0, 0, 0.14),
			0 1px 10px 0 rgba(0, 0, 0, 0.12), 0 2px 4px -1px rgba(0, 0, 0, 0.2);
		border-radius: 4px;
		min-height: 80px;
		padding: 8px 0 5px;
		position: absolute;
		width: 500px;
		bottom: 24px;
		left: 24px;
		z-index: 101;
	`;
	const ToolbarContainer = css`
		position: relative;
		margin-left: auto;
		margin-right: auto;
	`;
	const ButtonTool = css`
		border: 0;
		border-radius: 4px;
		background-color: transparent;
		color: #7f828e;
		font-size: 20px;
		height: 35px;
		min-width: 35px;
		outline: none;
		margin: 0 2px;
		padding: 0 5px;
		:hover {
			background-color: rgba(32, 33, 36, 0.059);
			color: #222;
		}
		:focus {
			background-color: rgba(32, 33, 36, 0.122);
			color: #222;
		}
		:active {
		}
	`;
	const Divider = css`
		border-left: 2px solid #7f828e;
		display: inline-block;
		height: 27px;
		line-height: normal;
		list-style: none;
		margin: 0 2px;
		outline: none;
		overflow: hidden;
		padding: 0;
		text-decoration: none;
		vertical-align: sub;
		width: 0;
	`;

	useEffect(() => {
		const outputDocument = getElById(IDs.output).contentWindow.document;
		outputDocument.designMode = 'On';
		outputDocument.open();
		outputDocument.write('<html><head></head><body style="word-break: break-all"></body></html>');
		outputDocument.close();
	}, []);
	return (
		<div id={IDs.container} css={Container}>
			<div css={LabelContainer}>
				<label id={IDs.label} css={LabelContent}>
					{label}
				</label>
			</div>
			<div id={IDs.main} css={Main}>
				<iframe name={IDs.output} id={IDs.output} css={Output}></iframe>
				<div id={IDs.toolbar} css={Toolbar}>
					<div css={ToolbarContainer}>
						<button css={ButtonTool}>
							<Undo />
						</button>
						<button className={'hasDivider'} css={ButtonTool}>
							<Redo />
						</button>
						<div css={Divider} />
						<button css={ButtonTool}>
							<FontFamily width={'1.5em'} />
						</button>
						<button css={ButtonTool}>
							<FontSize width={'1.5em'} />
						</button>
						<div css={Divider} />
						<button css={ButtonTool}>
							<Bold />
						</button>
						<button css={ButtonTool}>
							<Italic />
						</button>
						<button css={ButtonTool}>
							<Underline />
						</button>
						<div css={Divider} />
						<button css={ButtonTool}>
							<TextColor width={'1.8em'} />
						</button>
						<button css={ButtonTool}>
							<BackgroundColor width={'1.8em'} />
						</button>
						<button css={ButtonTool}>
							<Emoji width={'1.8em'} />
						</button>
						<div css={Divider} />
						<button css={ButtonTool}>
							<Hyperlink />
						</button>
						<button css={ButtonTool}>
							<TextAlignLeft width={'1.5em'} />
						</button>
						<button css={ButtonTool}>
							<TextAlignCenter width={'1.5em'} />
						</button>
						<button css={ButtonTool}>
							<TextAlignRight width={'1.5em'} />
						</button>
						<button css={ButtonTool}>
							<TextAlignJustify width={'1.5em'} />
						</button>
						<div css={Divider} />
						<button css={ButtonTool}>
							<Bullets width={'1.8em'} />
						</button>
						<button css={ButtonTool}>
							<Numbering width={'1.8em'} />
						</button>
						<div css={Divider} />
						<button css={ButtonTool}>
							<Decrease width={'1.5em'} />
						</button>
						<button css={ButtonTool}>
							<Increase width={'1.5em'} />
						</button>
						<div css={Divider} />
						<button css={ButtonTool}>
							<Picture width={'1.5em'} height={'1.1em'} />
						</button>
						<button css={ButtonTool}>
							<Attach viewBox={'0 0 24 24'} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TextEditor;
