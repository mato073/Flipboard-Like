class User < ApplicationRecord

  attr_accessor :login

  validates :username, presence: true, uniqueness: {case_sensitive: false }, format: { with: /\A[a-zA-Z0 _\.]*\z/}

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :trackable

  def self.find_first_by_auth_conditions(warden_conditions)
    cond = warden_conditions.dup
    if login = cond.delete(:login)
      where(cond.to_hash).where("lower(username) = :value OR lower(email) = :value", value: login.downcase).first
    else
      where(cond.to_hash).first
    end
  end
end
