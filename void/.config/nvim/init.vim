"vim-plug
call plug#begin()
	Plug 'morhetz/gruvbox'
	Plug 'preservim/nerdtree'
	Plug 'itchyny/lightline.vim'
call plug#end()

"theme
autocmd vimenter * ++nested colorscheme gruvbox

" Exit Vim if NERDTree is the only window left.
autocmd BufEnter * if tabpagenr('$') == 1 && winnr('$') == 1 && exists('b:NERDTree') && b:NERDTree.isTabTree() |
    \ quit | endif

"keymap
nnoremap <leader>n :NERDTreeFocus<CR>
nnoremap <C-n> :NERDTreeToggle<CR>
nnoremap <C-f> :NERDTreeFind<CR>

" Tab navigation like Firefox: only 'open new tab' works in terminal
nnoremap <C-t>     :tabnew<CR>
inoremap <C-t>     <Esc>:tabnew<CR>
" move to the previous/next tabpage.
nnoremap <C-j> gT
nnoremap <C-k> gt
" Go to last active tab 
au TabLeave * let g:lasttab = tabpagenr()
nnoremap <silent> <c-l> :exe "tabn ".g:lasttab<cr>
vnoremap <silent> <c-l> :exe "tabn ".g:lasttab<cr>
" Close tab
nnoremap <C-w> :q<CR>
" Save tab
nnoremap <C-s> :w<CR>
"Indent
set autoindent
set smartindent

"Editor features
set cursorline
set number


"Misc
set incsearch


