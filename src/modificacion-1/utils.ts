import chalk from 'chalk';

/**
 * Function to apply the chalk colorization to the card color
 * 
 * @param color the color to colorize
 * @returns the colorized text
 */
export function getColorText(color: string): string {
  switch (color) {
    case 'White':
      return chalk.white('White');
    case 'Blue':
      return chalk.blue('Blue');
    case 'Black':
      return chalk.black('Black');
    case 'Red':
      return chalk.red('Red');
    case 'Green':
      return chalk.green('Green');
    case 'Colorless':
      return chalk.gray('Colorless');
    case 'Multicolor':
      return chalk.red('Mul') + chalk.green('ti') + chalk.blue('co') + chalk.yellow('lor');
    default:
      return color;
  }
}