"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardResolver = void 0;
const type_graphql_1 = require("type-graphql");
const card_1 = require("../entinties/card");
let cardResolver = class cardResolver {
    async flashcards() {
        return card_1.FlashCards.find();
    }
    async flashcard(id) {
        return card_1.FlashCards.findOne({ id });
    }
    createFlashcard(question, answer) {
        return card_1.FlashCards.create({ question, answer }).save();
    }
    async updateFlashcard(question, answer, id) {
        const task = await card_1.FlashCards.findOne(id);
        if (!task) {
            return null;
        }
        if (typeof question !== "undefined") {
            await card_1.FlashCards.update({ id }, { question });
        }
        if (typeof answer !== "undefined") {
            await card_1.FlashCards.update({ id }, { answer });
        }
        return task;
    }
    async deleteFlashcard(id) {
        if (await card_1.FlashCards.findOne({ id })) {
            await card_1.FlashCards.delete(id);
            return true;
        }
        else {
            return false;
        }
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [card_1.FlashCards]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], cardResolver.prototype, "flashcards", null);
__decorate([
    (0, type_graphql_1.Query)(() => card_1.FlashCards, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], cardResolver.prototype, "flashcard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => card_1.FlashCards),
    __param(0, (0, type_graphql_1.Arg)("question", () => String)),
    __param(1, (0, type_graphql_1.Arg)("answer", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], cardResolver.prototype, "createFlashcard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => card_1.FlashCards, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("question", () => String, { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)("answer", () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Number]),
    __metadata("design:returntype", Promise)
], cardResolver.prototype, "updateFlashcard", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], cardResolver.prototype, "deleteFlashcard", null);
cardResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], cardResolver);
exports.cardResolver = cardResolver;
//# sourceMappingURL=card.js.map