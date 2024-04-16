import { Color, TypeLine, Rarity } from './enums.js';

/**
 * Class that represents a Magic: The Gathering card
 */
export class Card {
  private _id: number; // The card ID
  private _name: string; // The card name
  private _manaCost: number; // The (total) mana cost
  private _color: Color; // The card color (only one color)
  private _typeLine: TypeLine; // The card type line
  private _rarity: Rarity; // The card rarity
  private _text: string; // The card text
  private _strength?: number; // Strength of the card (optional)
  private _endurance?: number; // Endurance of the card (optional)
  private _loyaltyMark?: number; // Loyalty mark of the card for Planeswalker (optional)
  private _value: number; // The card value in the market (in EUR)

  /**
   * The constructor of the class
   * 
   * @param id the card ID
   * @param name the card name
   * @param manaCost the card mana cost
   * @param color the card color
   * @param typeLine the card type line
   * @param rarity the card rarity
   * @param text the card text
   * @param value the card value
   * @param strength the card strength
   * @param endurance the card endurance
   * @param loyaltyMark the card loyalty mark
   */
  constructor(id: number, name: string, manaCost: number, color: Color, typeLine: TypeLine, rarity: Rarity, text: string, value: number, strength?: number, endurance?: number, loyaltyMark?: number) {
    this._id = id;
    this._name = name;
    this._manaCost = manaCost;
    this._color = color;
    this._typeLine = typeLine;
    this._rarity = rarity;
    this._text = text;
    this._value = value;
    this._strength = strength;
    this._endurance = endurance;
    this._loyaltyMark = loyaltyMark;
  }
  
  /**
   * Getter for the id
   * 
   * @returns the card ID
   */
  get id() {
    return this._id;
  }

  /**
   * Getter for the name
   * 
   * @returns the card name
   */
  get name() {
    return this._name;
  }

  /**
   * Getter for the mana cost
   * 
   * @returns the card mana cost
   */
  get manaCost() {
    return this._manaCost;
  }

  /**
   * Getter for the color
   * 
   * @returns the card color
   */
  get color() {
    return this._color;
  }

  /**
   * Getter for the type line
   * 
   * @returns the card type line
   */
  get typeLine() {
    return this._typeLine;
  }

  /**
   * Getter for the rarity
   * 
   * @returns the card rarity
   */
  get rarity() {
    return this._rarity;
  }

  /**
   * Getter for the text
   * 
   * @returns the card text
   */
  get text() {
    return this._text;
  }

  /**
   * Getter for the value
   * 
   * @returns the card value
   */
  get value() {
    return this._value;
  }

  /**
   * Getter for the strength
   * 
   * @returns the card strength
   */
  get strength() {
    return this._strength;
  }

  /**
   * Getter for the endurance
   * 
   * @returns the card endurance
   */
  get endurance() {
    return this._endurance;
  }

  /**
   * Getter for the loyalty mark
   * 
   * @returns the card loyalty mark
   */
  get loyaltyMark() {
    return this._loyaltyMark;
  }

  /**
   * Method to compare two cards
   * 
   * @param card the card to compare with
   * @returns true if the cards are equal, false otherwise
   */
  equals(card: Card): boolean {
    return this._id === card.id && this._name === card.name && this._manaCost === card.manaCost && this._color === card.color && this._typeLine === card.typeLine && this._rarity === card.rarity && this._text === card.text && this._value === card.value && this._strength === card.strength && this._endurance === card.endurance && this._loyaltyMark === card.loyaltyMark;
  }
}