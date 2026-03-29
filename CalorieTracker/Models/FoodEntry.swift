import Foundation
import SwiftData

@Model
final class FoodEntry {
    @Attribute(.unique) var id: UUID
    var name: String
    var calories: Int
    var protein: Double
    var carbs: Double
    var fat: Double
    var servingSize: String
    @Attribute(.externalStorage) var imageData: Data?
    var timestamp: Date

    init(
        id: UUID = UUID(),
        name: String,
        calories: Int,
        protein: Double = 0,
        carbs: Double = 0,
        fat: Double = 0,
        servingSize: String = "1 serving",
        imageData: Data? = nil,
        timestamp: Date = Date()
    ) {
        self.id = id
        self.name = name
        self.calories = calories
        self.protein = protein
        self.carbs = carbs
        self.fat = fat
        self.servingSize = servingSize
        self.imageData = imageData
        self.timestamp = timestamp
    }
}
